'use client';

import { Suspense, useEffect, useState } from 'react';
import { highlight } from './shared';
import type { CodeProps } from './Code';

export const CodeClientSide: React.FC<CodeProps> = (props) => {
  return <Suspense fallback={null}>{<InnerCode {...props} />}</Suspense>;
};

const InnerCode: React.FC<CodeProps> = ({
  code,
  // className,
  lang = 'tsx',
  // ...props
}) => {
  const [node, setNode] = useState(<p>Loading...</p>);
  useEffect(() => {
    void highlight(code, lang).then(setNode);
  }, [code, lang]);
  return node;
};
