import React from 'react';
import { BallTriangle } from 'react-loader-spinner';

const LoaderComponent = () => {
  return (
    <BallTriangle
      height='80'
      width='80'
      ariaLabel='loading'
    />
  );
}

export default LoaderComponent;
