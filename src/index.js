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
    const styleAttr = {};
    const extendsProps = {};

    if (this.props.fit) {
      styleAttr.objectFit = this.props.fit;
    }

    if (this.props.flexible) {
      styleAttr.width = '100%';
      styleAttr.height = '100%';
    }

    // Props given to this Component is inherited <img /> in all
    Object.keys(this.props)
      .filter(key => NOT_INHERITED_PROPS.indexOf(key) === -1)
      .forEach(key => {
        extendsProps[key] = this.props[key];
      });

    return (
      <img
        src={this.props.src}
        alt={this.props.alt}
        style={styleAttr}
        {...extendsProps}
      />
    );
  }

  // object-fit fallback
  renderImageWithObjectFitFallback() {
    const styleAttr = {
      display            : 'inline-block',
      width              : this.props.flexible ? '100%' : `${this.props.width}px`,
      height             : this.props.flexible ? '100%' : `${this.props.height}px`,
      backgroundImage    : `url(${this.props.src})`,
      backgroundRepeat   : 'no-repeat',
      backgroundPosition : 'center center'
    };

    if (!this.props.width) {
      delete styleAttr.width;
    }

    if (!this.props.height) {
      delete styleAttr.height;
    }

    if (this.props.fit) {
      styleAttr.backgroundSize = this.props.fit;
    }

    return (
      <div
        aria-label={this.props.alt}
        className={this.props.className}
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
