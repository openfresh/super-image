'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _propTypes = require('prop-types');

var PropTypes = _interopRequireWildcard(_propTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NOT_INHERITED_PROPS = ['flexible', 'fit', 'fitFallback'];

/**
 * Image with object-fit or object-fit fallback
 *
 * @class SuperImage
 */

var SuperImage = function (_React$Component) {
  _inherits(SuperImage, _React$Component);

  function SuperImage() {
    _classCallCheck(this, SuperImage);

    return _possibleConstructorReturn(this, (SuperImage.__proto__ || Object.getPrototypeOf(SuperImage)).apply(this, arguments));
  }

  _createClass(SuperImage, [{
    key: 'renderImage',
    value: function renderImage() {
      var _this2 = this;

      var _props = this.props,
          src = _props.src,
          alt = _props.alt,
          fit = _props.fit,
          flexible = _props.flexible;

      var styleAttr = {};
      var extendsProps = {};

      if (fit) {
        styleAttr.objectFit = fit;
      }

      if (flexible) {
        styleAttr.width = '100%';
        styleAttr.height = '100%';
      }

      // Props given to this Component is inherited <img /> in all
      Object.keys(this.props).forEach(function (key) {
        if (NOT_INHERITED_PROPS.indexOf(key) === -1) {
          extendsProps[key] = _this2.props[key];
        }
      });

      return React.createElement('img', _extends({
        src: src,
        alt: alt,
        style: styleAttr
      }, extendsProps));
    }

    // object-fit fallback

  }, {
    key: 'renderImageWithObjectFitFallback',
    value: function renderImageWithObjectFitFallback() {
      var _props2 = this.props,
          src = _props2.src,
          width = _props2.width,
          height = _props2.height,
          alt = _props2.alt,
          className = _props2.className,
          flexible = _props2.flexible,
          fit = _props2.fit;

      var styleAttr = {
        display: 'inline-block',
        width: flexible ? '100%' : width + 'px',
        height: flexible ? '100%' : height + 'px',
        backgroundImage: 'url(' + src + ')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
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

      return React.createElement('div', {
        'aria-label': alt,
        className: className,
        style: styleAttr
      });
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.fitFallback) {
        return this.renderImageWithObjectFitFallback();
      }
      return this.renderImage();
    }
  }]);

  return SuperImage;
}(React.Component);

SuperImage.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  fit: PropTypes.oneOf(['contain', 'cover']),
  fitFallback: PropTypes.bool,
  flexible: PropTypes.bool
};
SuperImage.defaultProps = {
  width: null,
  height: null,
  alt: '',
  className: '',
  fit: null,
  fitFallback: false,
  flexible: false
};
exports.default = SuperImage;