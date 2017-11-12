// Type definitions for super-image 2.0.0
// Project: https://github.com/openfresh/super-image

import * as React from 'react';

declare namespace SuperImage {
  export interface Props {
    src: string;
    sources?: React.SourceHTMLAttributes<HTMLSourceElement>[];
    width?: number | string;
    height?: number | string;
    alt?: string;
    className?: string;
    fit?: 'contain' | 'cover';
    fitFallback?: boolean;
    flexible?: boolean;
  }
}

declare class SuperImage extends React.Component<SuperImage.Props> {}

export default SuperImage;
