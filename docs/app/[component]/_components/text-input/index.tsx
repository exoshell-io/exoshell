import type { Meta } from '../_meta';
import { Demo } from './Demo';
import { Styles } from './Styles';

export const meta: Meta = {
  name: 'TextInput',
  import: `import { TextInput } from '@exoshell/ui';`,
  description: 'Capture string input from user',
  sections: [{ title: 'Usage', content: <Demo /> }],
  props: {
    Tabs: {
      children: {
        type: 'ReactNode',
        required: true,
        description: 'Button content',
      },
      className: {
        type: 'string',
        required: false,
        description: 'Classname',
      },
      onClick: {
        type: '() => void',
        required: false,
        description: 'Click event handler',
      },
    },
  },
  Styles,
};
