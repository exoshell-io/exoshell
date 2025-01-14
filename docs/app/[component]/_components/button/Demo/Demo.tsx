import { codeToHtml } from 'shiki';
import { ClientSide } from './ClientSide';

export const templateKeys = {} as const;

const codeTemplate = ``;

export const Demo: React.FC = async () => {
  const htmlCodeTemplate = await codeToHtml(codeTemplate, {
    lang: 'tsx',
    themes: { light: 'one-light', dark: 'github-dark' },
  });
  return <ClientSide htmlCodeTemplate={htmlCodeTemplate} />;
};
