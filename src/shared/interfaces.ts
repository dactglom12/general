import React from 'react';

export type ComponentWithChildren<T = {}> = React.FC<
  T & { children?: React.ReactNode }
>;
