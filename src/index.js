'use strict';

import * as React from 'react';
import * as PropTypes from 'prop-types';
import assign from 'object.assign';
import cx from 'bem-classnames';
import ViewportObserver from 'viewport-observer';

cx.prefixes.modifiers = '-';

const NOT_INHERITED_PROPS = [
  'src',
  'className',
  'flexible',
  'objectFit',
  'objectFitPolyfill',
  'lazyload',
  'rootMargin',
  'altImage'
];
const classes = {
  name      : 'SuperImage',
  modifiers : ['objectFit', 'flexible'],
  states    : ['error']
};

/**
 * Image with lazyload and object-fit
 *
 * @class SuperImage
 */
export default class SuperImage extends React.Component {
  static propTypes = {
    src               : PropTypes.string.isRequired,
    width             : PropTypes.string,
    height            : PropTypes.string,
    alt               : PropTypes.string,
    className         : PropTypes.string,
    flexible          : PropTypes.bool,
    objectFit         : PropTypes.oneOf(['contain', 'cover']),
    objectFitPolyfill : PropTypes.bool,
    lazyload          : PropTypes.bool,
    rootMargin        : PropTypes.string,
    altImage          : PropTypes.string
  };

  static defaultProps = {
    width             : null,
    height            : null,
    alt               : '',
    className         : '',
    flexible          : false,
    objectFit         : null,
    objectFitPolyfill : false,
    lazyload          : false,
    rootMargin        : '0px',
    altImage          : 'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=' // GIF with transparent background
  };

  constructor(props) {
    super(props);

    this.state = {
      src   : props.altImage,
      error : false
    };

    this.onEnter = this.onEnter.bind(this);
    this.onError = this.onError.bind(this);
  }

  onEnter() {
    this.setState({
      src : this.props.src
    });
  }

  onError() {
    this.setState({
      src   : this.props.altImage,
      error : true
    });
  }

  componentWillMount() {
    const { src, lazyload } = this.props;

    if (!lazyload) {
      this.setState({
        src : src
      });
    }
  }

  componentDidMount() {
    const { src, lazyload } = this.props;

    if (!window.IntersectionObserver || !lazyload) {
      this.setState({
        src : src
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.setState({
        src : nextProps.src
      });
    }
  }

  renderImage() {
    const { alt, className } = this.props;
    const { src } = this.state;

    // Props given to this Component is inherited <img /> in all
    const extendsProps = NOT_INHERITED_PROPS.reduce((curt, key) => {
      delete curt[key];
      return curt;
    }, assign({}, this.props));

    return (
      <img
        src={src}
        alt={alt}
        className={cx(classes, this.props, this.state, className)}
        onError={this.onError}
        {...extendsProps}
      />
    );
  }

  // object-fit polyfill
  renderImageWithObjectFitPolyfill() {
    const { width, height, alt, className, flexible } = this.props;
    const { src } = this.state;
    let styleAttr = {
      width           : `${width}px`,
      height          : `${height}px`,
      backgroundImage : `url(${src})`
    };

    if (!width || flexible) {
      delete styleAttr.width;
    }

    if (!height || flexible) {
      delete styleAttr.height;
    }

    return (
      <div
        aria-label={alt}
        className={cx(classes, this.props, className)}
        style={styleAttr}
      />
    );
  }

  render() {
    const { objectFit, objectFitPolyfill, lazyload, rootMargin } = this.props;
    let element;

    if (!objectFit) {
      element = this.renderImage();
    } else if (objectFitPolyfill) {
      element = this.renderImageWithObjectFitPolyfill();
    } else {
      element = this.renderImage();
    }

    if (lazyload) {
      return (
        <ViewportObserver
          triggerOnce
          rootMargin={rootMargin}
          onEnter={this.onEnter}
        >
          {element}
        </ViewportObserver>
      );
    }
    return element;
  }
}
