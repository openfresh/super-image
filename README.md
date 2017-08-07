# super-image

[![Build Status](https://travis-ci.org/openfresh/super-image.svg?branch=master)](https://travis-ci.org/openfresh/super-image)

React image component with `object-fit` and `object-fit` fallback

## Usage

### Example

```jsx
<SuperImage
  src="image.png"
  width="160"
  height="90"
  alt="super-image"
  fit="contain"
/>

// Not supported object fit
<SuperImage
  fitFallback
  src="image.png"
  width="160"
  height="90"
  alt="super-image"
  fit="contain"
/>
```

### Properties
| Property | Type | Description | Default value | Required |
|----------|------|-------------|---------------|----------|
| src | String | Image url | - | Yes |
| width | String | Image width | - | No |
| height | String | Image height | - | No |
| alt | String | Alternate text for image| "" | No |
| className | String | Custom className | "" | No |
| flexible | Boolean |If this is true, A Component size is not fixed. | false | No |
| fit | String | Value of the object-fit property. "contain", or "cover" | - | No |
| fitFallback | Boolean | Force the component to use `background-image` | false | No |

## LICENSE

See [LICENSE](LICENSE).

© [FRESH!](https://github.com/openfresh)
