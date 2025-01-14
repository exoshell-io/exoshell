import { type Meta } from '../_meta';
import { Demo } from './Demo';
import { Styles } from './Styles';

export const meta: Meta = {
  name: 'Breadcrumbs',
  description: 'Separates list of react nodes with given separator',
  import: "import { Breadcrumbs, Breadcrumb } from '@exoshell/ui';",
  sections: [{ title: 'Usage', content: <Demo /> }],
  props: {
    Breadcrumbs: {
      variant: {
        type: "'default'",
        description: 'Variant of the component',
        required: false,
      },
    },
    Breadcrumb: {},
  },
  Styles,
};
