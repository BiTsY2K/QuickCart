'use client';

import { RiMicrosoftLoopFill } from 'react-icons/ri';

export default function BrandLogoImage({
  className, ...props
}: { className?: string, height?: string, width?: string }) {
  return (
    <RiMicrosoftLoopFill {...props} className={`text-3xl text-primary ${className}`} />
  );
};
