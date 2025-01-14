import createMDX from '@next/mdx';
import rehypeShiki, { type RehypeShikiOptions } from '@shikijs/rehype';
import {
  transformerNotationDiff,
  transformerNotationFocus,
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerCompactLineOptions,
} from '@shikijs/transformers';
import { transformerTwoslash } from '@shikijs/twoslash';
import { ModuleResolutionKind } from 'typescript';

export default createMDX({
  options: {
    rehypePlugins: [
      [
        rehypeShiki,
        {
          themes: { light: 'min-light', dark: 'github-dark' },
          // See https://shiki.style/packages/transformers
          transformers: [
            transformerNotationDiff(),
            transformerNotationFocus(),
            transformerMetaHighlight(),
            transformerMetaWordHighlight(),
            transformerCompactLineOptions(),
            transformerTwoslash({
              explicitTrigger: true,
              twoslashOptions: {
                compilerOptions: {
                  moduleResolution: ModuleResolutionKind.Bundler,
                },
              },
            }),
          ],
        } satisfies RehypeShikiOptions,
      ],
    ],
  },
})({
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
});
