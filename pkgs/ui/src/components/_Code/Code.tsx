import { type SlotComponentProps } from '../..';
import type { BundledLanguage } from 'shiki/bundle/web';
import { _tvCode } from './styles';
import { codeToHtml } from 'shiki';

export type CodeProps = SlotComponentProps<
  typeof _tvCode,
  'root',
  React.ComponentPropsWithRef<'div'> & {
    code: string;
    lang?: BundledLanguage;
  }
>;

export const Code: React.FC<CodeProps> = async ({ code, lang = 'tsx' }) => {
  const _code = await codeToHtml(code, {
    lang,
    themes: { light: 'one-light', dark: 'github-dark' },
  });
  // eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml
  return <div dangerouslySetInnerHTML={{ __html: _code }} />;
};
