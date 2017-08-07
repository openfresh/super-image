'use strict';

import * as React from 'react';
import * as PropTypes from 'prop-types';

const NOT_INHERITED_PROPS = [
  'flexible',
  'fit',
  'fitFallback'
];

/**
 * Image with object-fit or object-fit fallback
 *
 * @class SuperImage
 */
export default class SuperImage extends React.Component {
  static propTypes = {
    src         : PropTypes.string.isRequired,
    width       : PropTypes.string,
    height      : PropTypes.string,
    alt         : PropTypes.string,
    className   : PropTypes.string,
    fit         : PropTypes.oneOf(['contain', 'cover']),
    fitFallback : PropTypes.bool,
    flexible    : PropTypes.bool
  };

  static defaultProps = {
    width       : null,
    height      : null,
    alt         : '',
    className   : '',
    fit         : null,
    fitFallback : false,
    flexible    : false
  };

  renderImage() {
    const { src, alt, fit, flexible } = this.props;
    let styleAttr = {};
    let extendsProps = {};

    if (fit) {
      styleAttr.objectFit = fit;
    }

    if (flexible) {
      styleAttr.width = '100%';
      styleAttr.height = '100%';
    }

    // Props given to this Component is inherited <img /> in all
    Object.keys(this.props).forEach(key => {
      if (NOT_INHERITED_PROPS.indexOf(key) === -1) {
        extendsProps[key] = this.props[key];
      }
    });

    return (
      <img
        src={src}
        alt={alt}
        style={styleAttr}
        {...extendsProps}
      />
    );
  }

  // object-fit fallback
  renderImageWithObjectFitFallback() {
    const { src, width, height, alt, className, flexible, fit } = this.props;
    let styleAttr = {
      display            : 'inline-block',
      width              : flexible ? '100%' : `${width}px`,
      height             : flexible ? '100%' : `${height}px`,
      backgroundImage    : `url(${src})`,
      backgroundRepeat   : 'no-repeat',
      backgroundPosition : 'center center'
    };

    if (!width) {
      delete styleAttr.width;
    }

    if (!height) {
      delete styleAttr.height;
    }

    if (fit) {
      styleAttr.backgroundSize = fit;
    }

    return (
      <div
        aria-label={alt}
        className={className}
        style={styleAttr}
      />
    );
  }

  render() {
    if (this.props.fitFallback) {
      return this.renderImageWithObjectFitFallback();
    }
    return this.renderImage();
  }
}
