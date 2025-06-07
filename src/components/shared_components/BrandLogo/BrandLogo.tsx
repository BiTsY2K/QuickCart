'use client';

import Link from 'next/link';

import BrandLogoName from './BrandLogoName';
import BrandLogoImage from './BrandLogoImage';

export default function BrandLogo({ className, brandImgClasses, brandNameClasses }: {
  className?: string, brandImgClasses?: string, brandNameClasses?: string
}) {
  return (
    <Link href="/" className={`flex cursor-pointer items-center gap-1 ${className}`} >
      <BrandLogoImage className={`${brandImgClasses}`} />
      <BrandLogoName className={`mt-0.5 ${brandNameClasses}`} />
    </Link>
  );
};
