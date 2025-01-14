import type { Meta } from '../_meta';
import { Demo } from './Demo';
import { Styles } from './Styles';

export const meta: Meta = {
  name: 'Button',
  import: `import { Button } from '@exoshell/ui';`,
  description: 'Button component to render button or link',
  props: {},
  sections: [{ title: 'Usage', content: <Demo /> }],
  Styles,
};
