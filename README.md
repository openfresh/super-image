# SuperImage

[![Build Status](https://travis-ci.org/openfresh/super-image.svg?branch=master)](https://travis-ci.org/openfresh/super-image)
[![devDependency Status](https://david-dm.org/openfresh/super-image/dev-status.svg)](https://david-dm.org/openfresh/super-image?type=dev)
[![peerDependency Status](https://david-dm.org/openfresh/super-image/peer-status.svg)](https://david-dm.org/openfresh/super-image?type=peer)
[![codecov](https://codecov.io/gh/openfresh/super-image/branch/master/graph/badge.svg)](https://codecov.io/gh/openfresh/super-image)

> React component that render the HTML `<img>` or `<picture>` with [`object-fit`](https://developer.mozilla.org/docs/Web/CSS/object-fit) and its fallback

## Install

```bash
$ npm install --save super-image
```

This package use `Object.assign()`, so you may need to polyfill via [`object.assign`](https://github.com/ljharb/object.assign).

## Usage

```jsx
<SuperImage
  src="image.png"
  width="160"
  height="90"
  alt="super-image"
  fit="contain"
/>

// Use <picture> element
<SuperImage
  src="image.png"
  sources={[{ srcSet : 'image@2X.png 2x' }]}
  width="160"
  height="90"
  alt="super-image"
  fit="contain"
/>

// Use fallback for object fit
<SuperImage
  fitFallback
  src="image.png"
  width="160"
  height="90"
  alt="super-image"
  fit="contain"
/>
```

## Config

| Property | Type | Description | Default value | Required |
|----------|------|-------------|---------------|----------|
| src | String | Image url | - | Yes |
| sources | Array<Object> | Sets of `<source>` element attributes: `srcSet`, `sizes`, `media` and `type` | `[]` | No |
| width | [`DOMString`](https://heycam.github.io/webidl/#idl-DOMString) | Image width | - | No |
| height | [`DOMString`](https://heycam.github.io/webidl/#idl-DOMString) | Image height | - | No |
| alt | String | Alternative text for `<img>` element | `""` | No |
| className | String | `className` property for component | `""` | No |
| flexible | Boolean | If true, component size will not be fixed | `false` | No |
| fit | String | Value for `object-fit` property: `contain` or `cover` | - | No |
| fitFallback | Boolean | Force component to use `background-image` | `false` | No |

## License

MIT © [FRESH!](https://github.com/openfresh)
