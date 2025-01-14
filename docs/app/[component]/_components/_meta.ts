export type Meta = {
  name: string;
  description: string;
  import: string;
  tableOfContent?: string[];
  props: {
    [component: string]: {
      [prop: string]: {
        type: string;
        required: boolean;
        description: string;
      };
    };
  };
  sections: DocumentationSection[];
  Styles: React.FC;
};

export type DocumentationSection = {
  title: string;
  content: React.ReactElement;
};
