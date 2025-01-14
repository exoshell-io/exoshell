import { Project } from 'ts-morph';

const project = new Project({
  tsConfigFilePath: 'tsconfig.json',
});

type Prop = {
  name: string;
  type: string;
  isOptional: boolean;
  doc?: string;
};

function getProps(file: string, type: string): Prop[] {
  const f = project.getSourceFileOrThrow(file);

  return f
    .getTypeAlias(type)!
    .getType()
    .getApparentProperties()
    .map((p) => {
      return {
        name: p.getName(),
        type: p
          .getDeclarations()
          .map((d) => d.getType().getText(undefined))[0]!,
        isOptional: p.isOptional(),
        doc: p
          .getDeclarations()
          .flatMap((d) =>
            d.getLeadingCommentRanges().flatMap((c) =>
              c
                .getText()
                .split('\n')
                .filter((t) => !t.includes('eslint-'))
                .map((t) =>
                  t
                    .replace(/^\s*\/\//, '')
                    .replace(/^\s*\*/, '')
                    .replace(/^\s*\/\*\*?/, '')
                    .replace(/\*\/\s*$/, '')
                    .trim(),
                )
                .filter((t) => t !== '' && t !== '*/' && t !== '/**')
                .flatMap((t) => t.replace(/^\s*\*\s+/, '').trim()),
            ),
          )
          .join(' '),
      };
    });
}

const p: [file: string, types: string[]][] = [
  [
    'src/components/Breadcrumbs/Breadcrumbs.tsx',
    ['BreadcrumbsProps', 'BreadcrumbProps'],
  ],
  ['src/components/Button/Button.tsx', ['ButtonProps']],
  [
    'src/components/ToggleButton/ToggleButton.tsx',
    ['ToggleButtonProps', 'ToggleButtonGroupProps'],
  ],
  ['src/components/Menu/Menu.tsx', ['MenuProps']],
];

const props = new Map<string, { component: string; props: Prop[] }[]>();

for (const [file, types] of p) {
  props.set(file, []);
  for (const type of types) {
    props.get(file)?.push({
      component: type,
      props: getProps(file, type),
    });
  }
}

await Bun.write(
  'dist/docs.json',
  JSON.stringify(Object.fromEntries(props), undefined, 2),
);

// =============================================================================
// #region UnionToStringArray
type ValueOf<T> = T[keyof T];

type NonEmptyArray<T> = [T, ...T[]];

type MustInclude<T, U extends T[]> = [T] extends [ValueOf<U>] ? U : never;

export function stringUnionToArray<T>() {
  return <U extends NonEmptyArray<T>>(...elements: MustInclude<T, U>) =>
    elements;
}
// #endregion
