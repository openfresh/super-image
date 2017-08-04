'use strict';

import * as assert from 'power-assert';
import * as React from 'react';
import * as TestUtils from 'react-dom/test-utils';
import SuperImage from '.';

describe('SuperImage', () => {
  it('should return `<img>` element', () => {
    const superImage = TestUtils.renderIntoDocument(<SuperImage src="" />);
    const node = TestUtils.findRenderedDOMComponentWithClass(superImage, 'SuperImage');

    assert(node.tagName === 'IMG');
  });

  it('should return `<div>` element when `SuperImage` has `fitFallback` property', () => {
    const superImage = TestUtils.renderIntoDocument(<SuperImage fitFallback src="" fit="cover" />);
    const node = TestUtils.findRenderedDOMComponentWithClass(superImage, 'SuperImage');

    assert(node.tagName === 'DIV');
  });

  it('should have an empty `alt` when the `alt` attribute does not exist', () => {
    const superImage = TestUtils.renderIntoDocument(<SuperImage src="" />);
    const node = TestUtils.findRenderedDOMComponentWithTag(superImage, 'img');

    assert(node.hasAttribute('alt'));
  });

  it('should have expected `className`', () => {
    const superImage = TestUtils.renderIntoDocument(<SuperImage flexible src="" className="a" />);
    const node = TestUtils.findRenderedDOMComponentWithTag(superImage, 'img');

    assert(node.className === 'SuperImage -flexible a');
  });

  it('should switch to an alternate image when failed to load the image', () => {
    const superImage = TestUtils.renderIntoDocument(<SuperImage src="" />);
    superImage.onError();
    const node = TestUtils.findRenderedDOMComponentWithTag(superImage, 'img');
    assert(node.getAttribute('src').indexOf('data:image/gif') !== -1);
  });
});
