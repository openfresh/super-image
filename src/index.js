'use strict';

import * as React from 'react';
import * as PropTypes from 'prop-types';

const UNKNOWN_PROPS = [
  'sources',
  'width',
  'height',
  'flexible',
  'fit',
  'fitFallback'
];
const POSITIVE_INTEGER_PATTERN = /^\d+$/;

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
    width       : PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height      : PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    alt         : PropTypes.string,
    role        : PropTypes.oneOf(['none', 'presentation']),
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
    role        : null,
    className   : '',
    fit         : null,
    fitFallback : false,
    flexible    : false
  };

  renderImage() {
    const style = {};
    const props = {};

    if (this.props.fit) {
      style.objectFit = this.props.fit;
    }

    if (this.props.flexible) {
      style.width = '100%';
      style.height = '100%';
    } else {
      if (POSITIVE_INTEGER_PATTERN.test(this.props.width)) {
        style.width = `${this.props.width}px`;
      } else if (this.props.width) {
        style.width = this.props.width;
      }

      if (POSITIVE_INTEGER_PATTERN.test(this.props.height)) {
        style.height = `${this.props.height}px`;
      } else if (this.props.height) {
        style.height = this.props.height;
      }
    }

    // Props given to this Component is inherited <img /> in all
    Object.keys(this.props)
      .filter(key => UNKNOWN_PROPS.indexOf(key) === -1)
      .forEach(key => {
        props[key] = this.props[key];
      });

    // If alt is empty, only 'img' is specified as role
    // @see https://www.w3.org/TR/html-aria/#img-alt
    if (props.alt && props.role) {
      props.role = 'img';
    }

    // Render picture element if `sources` property exists
    if (this.props.sources.length > 0) {
      const pictureStyle = this.props.flexible ? {
        width  : '100%',
        height : '100%'
      } : {};

      /* eslint-disable react/no-array-index-key */
      const sources = this.props.sources.map((source, i) => {
        return <source key={i} {...source} />;
      });
      /* eslint-disable react/no-array-index-key */

      return (
        <picture style={pictureStyle}>
          {sources}
          <img
            src={this.props.src}
            alt={this.props.alt}
            style={style}
            {...props}
          />
        </picture>
      );
    }

    return (
      <img
        src={this.props.src}
        alt={this.props.alt}
        style={style}
        {...props}
      />
    );
  }

  renderImageWithObjectFitFallback() {
    const style = {
      display            : 'inline-block',
      backgroundImage    : `url(${this.props.src})`,
      backgroundRepeat   : 'no-repeat',
      backgroundPosition : 'center center'
    };

    if (this.props.flexible) {
      style.width = '100%';
      style.height = '100%';
    } else {
      if (POSITIVE_INTEGER_PATTERN.test(this.props.width)) {
        style.width = `${this.props.width}px`;
      } else if (this.props.width) {
        style.width = this.props.width;
      }

      if (POSITIVE_INTEGER_PATTERN.test(this.props.height)) {
        style.height = `${this.props.height}px`;
      } else if (this.props.height) {
        style.height = this.props.height;
      }
    }

    if (this.props.fit) {
      style.backgroundSize = this.props.fit;
    }

    return (
      <div
        role={this.props.alt ? 'img' : (this.props.role || 'img')}
        aria-label={this.props.alt}
        className={this.props.className}
        style={style}
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
