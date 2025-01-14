import { ClientSide } from './ClientSide';
import { codeToHtml } from 'shiki';

export const templateKeys = {
  label: 'XXX_LABEL_XXX',
  description: 'XXX_DESCRIPTION_XXX',
  placeholder: 'XXX_PLACEHOLDER_XXX',
} as const;

const codeTemplate = `import { TextInput } from '@exoshell/ui';

function Demo() {
  return (
    <TextInput
      label='${templateKeys.label}'
      description='${templateKeys.description}'
      placeholder='${templateKeys.placeholder}'
    />
  )
}
`;

export const Demo: React.FC = async () => {
  const htmlCodeTemplate = await codeToHtml(codeTemplate, {
    lang: 'tsx',
    themes: { light: 'one-light', dark: 'github-dark' },
  });
  return <ClientSide htmlCodeTemplate={htmlCodeTemplate} />;
};
