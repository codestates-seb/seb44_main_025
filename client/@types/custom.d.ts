declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.jpeg';
declare module '*.jpg';
declare module '*.png';

declare function PostcodeMap({
  defaultAddress,
  setAddress,
}: {
  defaultAddress?: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element;
