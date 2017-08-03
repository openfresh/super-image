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

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

var _bemClassnames = require('bem-classnames');

var _bemClassnames2 = _interopRequireDefault(_bemClassnames);

var _viewportObserver = require('viewport-observer');

var _viewportObserver2 = _interopRequireDefault(_viewportObserver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_bemClassnames2.default.prefixes.modifiers = '-';

var NOT_INHERITED_PROPS = ['src', 'className', 'flexible', 'objectFit', 'objectFitPolyfill', 'lazyload', 'rootMargin', 'altImage'];
var classes = {
  name: 'SuperImage',
  modifiers: ['objectFit', 'flexible'],
  states: ['error']
};

/**
 * Image with lazyload and object-fit
 *
 * @class SuperImage
 */

var SuperImage = function (_React$Component) {
  _inherits(SuperImage, _React$Component);

  function SuperImage(props) {
    _classCallCheck(this, SuperImage);

    var _this = _possibleConstructorReturn(this, (SuperImage.__proto__ || Object.getPrototypeOf(SuperImage)).call(this, props));

    _this.state = {
      src: props.altImage,
      error: false
    };

    _this.onEnter = _this.onEnter.bind(_this);
    _this.onError = _this.onError.bind(_this);
    return _this;
  }

  _createClass(SuperImage, [{
    key: 'onEnter',
    value: function onEnter() {
      this.setState({
        src: this.props.src
      });
    }
  }, {
    key: 'onError',
    value: function onError() {
      this.setState({
        src: this.props.altImage,
        error: true
      });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          src = _props.src,
          lazyload = _props.lazyload;


      if (!lazyload) {
        this.setState({
          src: src
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props2 = this.props,
          src = _props2.src,
          lazyload = _props2.lazyload;


      if (!window.IntersectionObserver || !lazyload) {
        this.setState({
          src: src
        });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.src !== this.props.src) {
        this.setState({
          src: nextProps.src
        });
      }
    }
  }, {
    key: 'renderImage',
    value: function renderImage() {
      var _props3 = this.props,
          alt = _props3.alt,
          className = _props3.className;
      var src = this.state.src;

      // Props given to this Component is inherited <img /> in all

      var extendsProps = NOT_INHERITED_PROPS.reduce(function (curt, key) {
        delete curt[key];
        return curt;
      }, (0, _object2.default)({}, this.props));

      return React.createElement('img', _extends({
        src: src,
        alt: alt,
        className: (0, _bemClassnames2.default)(classes, this.props, this.state, className),
        onError: this.onError
      }, extendsProps));
    }

    // object-fit polyfill

  }, {
    key: 'renderImageWithObjectFitPolyfill',
    value: function renderImageWithObjectFitPolyfill() {
      var _props4 = this.props,
          width = _props4.width,
          height = _props4.height,
          alt = _props4.alt,
          className = _props4.className,
          flexible = _props4.flexible;
      var src = this.state.src;

      var styleAttr = {
        width: width + 'px',
        height: height + 'px',
        backgroundImage: 'url(' + src + ')'
      };

      if (!width || flexible) {
        delete styleAttr.width;
      }

      if (!height || flexible) {
        delete styleAttr.height;
      }

      return React.createElement('div', {
        'aria-label': alt,
        className: (0, _bemClassnames2.default)(classes, this.props, className),
        style: styleAttr
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props5 = this.props,
          objectFit = _props5.objectFit,
          objectFitPolyfill = _props5.objectFitPolyfill,
          lazyload = _props5.lazyload,
          rootMargin = _props5.rootMargin;

      var element = void 0;

      if (!objectFit) {
        element = this.renderImage();
      } else if (objectFitPolyfill) {
        element = this.renderImageWithObjectFitPolyfill();
      } else {
        element = this.renderImage();
      }

      if (lazyload) {
        return React.createElement(
          _viewportObserver2.default,
          {
            triggerOnce: true,
            rootMargin: rootMargin,
            onEnter: this.onEnter
          },
          element
        );
      }
      return element;
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
  flexible: PropTypes.bool,
  objectFit: PropTypes.oneOf(['contain', 'cover']),
  objectFitPolyfill: PropTypes.bool,
  lazyload: PropTypes.bool,
  rootMargin: PropTypes.string,
  altImage: PropTypes.string
};
SuperImage.defaultProps = {
  width: null,
  height: null,
  alt: '',
  className: '',
  flexible: false,
  objectFit: null,
  objectFitPolyfill: false,
  lazyload: false,
  rootMargin: '0px',
  altImage: 'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=' // GIF with transparent background
};
exports.default = SuperImage;