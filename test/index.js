'use strict';

import * as assert from 'power-assert';
import * as React from 'react';
import * as TestUtils from 'react-dom/test-utils';
import SuperImage from '../src';

describe('SuperImage without fallback', () => {
  it('should return `<img>` element', () => {
    const superImage = TestUtils.renderIntoDocument(<SuperImage src="" />);
    const node = TestUtils.findRenderedDOMComponentWithTag(superImage, 'img');

    assert.equal(node.tagName, 'IMG');
    assert.equal(node.style.objectFit, '');
  });

  it('should have expected `alt`', () => {
    const superImage = TestUtils.renderIntoDocument(<SuperImage alt="foo" src="" />);
    const node = TestUtils.findRenderedDOMComponentWithTag(superImage, 'img');

    assert.equal(node.alt, 'foo');
  });

  it('should have an empty `alt` when the `alt` attribute does not exist', () => {
    const superImage = TestUtils.renderIntoDocument(<SuperImage src="" />);
    const node = TestUtils.findRenderedDOMComponentWithTag(superImage, 'img');

    assert(node.hasAttribute('alt'));
  });

  it('should have expected `className`', () => {
    const superImage = TestUtils.renderIntoDocument(<SuperImage src="" className="foo" />);
    const node = TestUtils.findRenderedDOMComponentWithTag(superImage, 'img');

    assert.equal(node.className, 'foo');
  });

  it('should have `width` and `height` with 100% when `flexible` attribute exists', () => {
    const superImage = TestUtils.renderIntoDocument(<SuperImage flexible src="" />);
    const node = TestUtils.findRenderedDOMComponentWithTag(superImage, 'img');

    assert.equal(node.style.width, '100%');
    assert.equal(node.style.height, '100%');
  });

  it('should have `objectFit` when `fit` attribute exists', () => {
    const superImage = TestUtils.renderIntoDocument(<SuperImage fit="contain" src="" />);
    const node = TestUtils.findRenderedDOMComponentWithTag(superImage, 'img');

    assert.equal(node.style.objectFit, 'contain');
  });
});

describe('SuperImage with fallback', () => {
  it('should return `<div>` element when `SuperImage` has `fitFallback` property', () => {
    const superImage = TestUtils.renderIntoDocument(<SuperImage fitFallback src="" />);
    const node = TestUtils.findRenderedDOMComponentWithTag(superImage, 'div');

    assert.equal(node.tagName, 'DIV');
    assert.equal(node.style.backgroundSize, '');
    assert.equal(node.style.display, 'inline-block');
    assert.equal(node.style.backgroundRepeat, 'no-repeat');
    assert.equal(node.style.backgroundPosition, 'center center');
  });

  it('should have expected `aria-label`', () => {
    const superImage = TestUtils.renderIntoDocument(<SuperImage fitFallback alt="foo" src="" />);
    const node = TestUtils.findRenderedDOMComponentWithTag(superImage, 'div');

    assert.equal(node.getAttribute('aria-label'), 'foo');
  });

  it('should have an empty `aria-label` when the `alt` attribute does not exist', () => {
    const superImage = TestUtils.renderIntoDocument(<SuperImage fitFallback src="" />);
    const node = TestUtils.findRenderedDOMComponentWithTag(superImage, 'div');

    assert(node.hasAttribute('aria-label'));
  });

  it('should have expected `className`', () => {
    const superImage = TestUtils.renderIntoDocument(<SuperImage fitFallback src="" className="foo" />);
    const node = TestUtils.findRenderedDOMComponentWithTag(superImage, 'div');

    assert.equal(node.className, 'foo');
  });

  it('should have `width` and `height` with specified value', () => {
    const superImage = TestUtils.renderIntoDocument(<SuperImage fitFallback width="10" height="10" src="" />);
    const node = TestUtils.findRenderedDOMComponentWithTag(superImage, 'div');

    assert.equal(node.style.width, '10px');
    assert.equal(node.style.height, '10px');
  });

  it('should have `width` and `height` with 100% when `flexible` attribute exists', () => {
    const superImage = TestUtils.renderIntoDocument(<SuperImage fitFallback flexible width="10" height="10" src="" />);
    const node = TestUtils.findRenderedDOMComponentWithTag(superImage, 'div');

    assert.equal(node.style.width, '100%');
    assert.equal(node.style.height, '100%');
  });

  it('should have `backgroundSize` when `fit` attribute exists', () => {
    const superImage = TestUtils.renderIntoDocument(<SuperImage fitFallback fit="contain" src="" />);
    const node = TestUtils.findRenderedDOMComponentWithTag(superImage, 'div');

    assert.equal(node.style.backgroundSize, 'contain');
  });
});
