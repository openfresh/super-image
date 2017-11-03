// Type definitions for super-image 2.0.0
// Project: https://github.com/openfresh/super-image

import * as React from 'react';

declare namespace SuperImage {
  export interface Source {
    srcSet?: string;
    sizes?: string;
    media?: string;
    type?: string;
  }

  export interface Props {
    src: string;
    sources?: Source[];
    width?: string;
    height?: string;
    alt?: string;
    className?: string;
    fit?: 'contain' | 'cover';
    fitFallback?: boolean;
    flexible?: boolean;
  }
}

declare class SuperImage extends React.Component<SuperImage.Props> {}

export = SuperImage;
