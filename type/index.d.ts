// Type definitions for super-image 2.1.1
// Project: https://github.com/openfresh/super-image

import * as React from 'react';

declare namespace SuperImage {
  export interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    sources?: React.SourceHTMLAttributes<HTMLSourceElement>[];
    alt?: 'none' | 'presentation';
    fit?: 'contain' | 'cover';
    fitFallback?: boolean;
    flexible?: boolean;
  }
}

declare class SuperImage extends React.Component<SuperImage.Props> {}

export default SuperImage;
