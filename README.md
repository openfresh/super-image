# SuperImage

[![Build Status](https://travis-ci.org/openfresh/super-image.svg?branch=master)](https://travis-ci.org/openfresh/super-image)
[![devDependency Status](https://david-dm.org/openfresh/super-image/dev-status.svg)](https://david-dm.org/openfresh/super-image?type=dev)
[![peerDependency Status](https://david-dm.org/openfresh/super-image/peer-status.svg)](https://david-dm.org/openfresh/super-image?type=peer)
[![codecov](https://codecov.io/gh/openfresh/super-image/branch/master/graph/badge.svg)](https://codecov.io/gh/openfresh/super-image)

> React component that render `<img>` with nicer interface

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
```

### Use `<picture>` element

Set `sources` property.

```jsx
<SuperImage
  src="image.png"
  sources={[{
    srcSet : 'image.webp',
    type   : 'image/webp'
  }]}
  width="160"
  height="90"
  alt="super-image"
  fit="contain"
/>
```

### Use `object-fit` fallback

Set `fitFallback` property `true`.

```jsx
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
| sources | Array<Object> | Sets of `<source>` attributes: `srcSet`, `sizes`, `media` and `type` | `[]` | No |
| width | [`DOMString`](https://heycam.github.io/webidl/#idl-DOMString) | Image width | - | No |
| height | [`DOMString`](https://heycam.github.io/webidl/#idl-DOMString) | Image height | - | No |
| alt | String | Alternative text for `<img>` | `""` | No |
| className | String | `className` property for component | `""` | No |
| flexible | Boolean | Make component fluid | `false` | No |
| fit | String | CSS `object-fit` property for `<img>` (`contain` or `cover`) | - | No |
| fitFallback | Boolean | Force component to use `background-image` | `false` | No |

## License

MIT © [FRESH!](https://github.com/openfresh)
