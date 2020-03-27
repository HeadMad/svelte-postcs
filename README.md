# Use Your Favorite PostCSS-Plugins With Svelte

[Svelte](https://github.com/sveltejs/svelte#readme) plugin for using PostCSS plugins in svelte components

## Install
```
npm install --save-dev HeadMad/svelte-postcss#1.0
```

## Usage
```javascript
// rollup.config.js

import svelte from 'rollup-plugin-svelte';
import postcss from 'svelte-postcss';
import globalsStyles from 'postcss-svelte-global-styles'
...

export default {
  ...
  plugins: [
    svelte({
      preprocess: [
        postcss([
          globalStyles,
          ...
        ])
      ],
      ...
    })
  ]
}
```
In exemple used plugin [postcss-svelte-global-styles](https://github.com/HeadMad/postcss-svelte-global-styles#readme)

## Also
You can use other gonfig sources. Like exemple - section `postcss` in `package.json`
```json
{
  ...
  "postcss": {
    "map": false,
    "plugins": {
      "postcss-svelte-global-styles": {},
      ...
    }
  }
}
```

Or `postcss.config.js` file
```javascript
module.exports = {
  map: false,
  plugins: {
    'postcss-svelte-global-styles': {}
    }
  }
}
```
