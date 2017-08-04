# super-image

React image component with `LazyLoad` and `object-fit`

## Usage

### Example

You'll have to include the CSS file in your project.

```html
<link rel="stylesheet" type="text/css" href="/dist/super-image.css"/>
```

```jsx
// Use LazyLoad and object-fit
<SuperImage
  lazyload
  src="image.png"
  width="160"
  height="90"
  alt="super-image"
  fit="contain"
/>

// Not supported object fit
<SuperImage
  fitFallback
  lazyload
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
| altImage | String | Alternate image src |GIF with transparent background| No |
| flexible | Boolean |If this is true, A Component size is not fixed. | false | No |
| fit | String | Value of the object-fit property. "contain", or "cover" | - | No |
| fitFallback | Boolean | Force the component to use `background-image` | false | No |
| lazyload | Boolean | Use lazyload | false | No |
| rootMargin | DOMString | `viewport-observer` property. <br />See [viewport-observer](https://github.com/openfresh/viewport-observer/blob/master/readme.md#config) to get more details. | "0px" | No |


## Dependencies

- [bem-classnames](https://github.com/pocotan001/bem-classnames)
- [object.assign](https://github.com/ljharb/object.assign)
- [viewport-observer](https://github.com/openfresh/viewport-observer)

## LICENSE

See [LICENSE](LICENSE).

© [FRESH!](https://github.com/openfresh)
