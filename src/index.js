'use strict';

import * as React from 'react';
import * as PropTypes from 'prop-types';

const NOT_INHERITED_PROPS = [
  'flexible',
  'fit',
  'fitFallback'
];

/**
 * React component that render a image with object-fit and its fallback
 *
 * @class SuperImage
 */
export default class SuperImage extends React.Component {
  static propTypes = {
    src     : PropTypes.string.isRequired,
    sources : PropTypes.arrayOf(PropTypes.shape({
      srcSet : PropTypes.string,
      sizes  : PropTypes.string,
      media  : PropTypes.string,
      type   : PropTypes.string
    })),
    width       : PropTypes.string,
    height      : PropTypes.string,
    alt         : PropTypes.string,
    className   : PropTypes.string,
    fit         : PropTypes.oneOf(['contain', 'cover']),
    fitFallback : PropTypes.bool,
    flexible    : PropTypes.bool
  };

  static defaultProps = {
    sources     : [],
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

    // Render picture element if `sources` property exists
    if (this.props.sources.length > 0) {
      const styleAttrForPict = {};

      if (this.props.flexible) {
        styleAttrForPict.width = '100%';
        styleAttrForPict.height = '100%';
      }

      return (
        <picture style={styleAttrForPict}>
          {this.props.sources.map((source, i) => {
            /* eslint-disable react/no-array-index-key */
            return <source key={i} {...source} />;
            /* eslint-disable react/no-array-index-key */
          })}
          <img
            src={this.props.src}
            alt={this.props.alt}
            style={styleAttr}
            {...extendsProps}
          />
        </picture>
      );
    }

    return (
      <img
        src={this.props.src}
        alt={this.props.alt}
        style={styleAttr}
        {...extendsProps}
      />
    );
  }

  renderImageWithObjectFitFallback() {
    const styleAttr = {
      display            : 'inline-block',
      backgroundImage    : `url(${this.props.src})`,
      backgroundRepeat   : 'no-repeat',
      backgroundPosition : 'center center'
    };

    if (this.props.flexible) {
      styleAttr.width = '100%';
    } else if (this.props.width) {
      styleAttr.width = `${this.props.width}px`;
    }

    if (this.props.flexible) {
      styleAttr.height = '100%';
    } else if (this.props.height) {
      styleAttr.height = `${this.props.height}px`;
    }

    if (this.props.fit) {
      styleAttr.backgroundSize = this.props.fit;
    }

    return (
      <div
        role="img"
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
