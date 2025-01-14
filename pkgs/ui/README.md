# Exoshell UI

## Install

```sh
bun install --exact @exoshell/ui
```

## Usage

### Option 1

This is the simplest option since all styles from Exoshell UI will be imported.

```ts
import '@exoshell/ui/styles.css';
import { Button } from '@exoshell/ui';
```

### Option 2 (using TailwindCss)

This is a more optimized solution where you only import the styles
from the components you use.

`tailwind.config.mjs`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './node_modules/@exoshell/ui/src/components/{Button,TextInput}/**/*.{ts,tsx}',
    // Or one line per component
    './node_modules/@exoshell/ui/src/components/Button/**/*.{ts,tsx}',
    './node_modules/@exoshell/ui/src/components/TextInput/**/*.{ts,tsx}',
    // Or generating
    ...['Button', 'TextInput'].map(
      (c) => `./node_modules/@exoshell/ui/src/components/${c}/**/*.{ts,tsx}`,
    ),
  ],
};
```
