import Link from 'next/link';
import React from 'react';

import { footerData, paymentsData, socialLinks } from '@/data/content';

import Image from 'next/image';
import { NewsletterSubscribe } from '../../NewsLetterSubscribe';
import { LanguageSelector } from '@/components/LanguageSelector';
import { FooterSection } from './components/FooterSection';
import { RegisteredOfficeAddress } from './components/RegisteredOfficeAddress';

const FooterNavigation = () => {
  return (
    <div className="grid auto-rows-auto grid-cols-2 grid-rows-6 lg:grid-rows-2 lg:grid-cols-12 gap-x-3 gap-y-4 border-b border-primary/15 dark:border-white/15">
      <RegisteredOfficeAddress className="px-2.5 row-start-1 row-span-1 col-span-2 lg:row-start-1 lg:col-start-1 lg:row-span-1 lg:col-span-3 text-[0.937rem]" />

      {/* Get to Know us */}
      <FooterSection title='Get to Know Us' sectionDataList={footerData.footerGetToKnowUs}
        className='px-2.5 row-start-3 row-span-1 col-span-1 md:col-span-4 lg:row-start-1 lg:col-start-4 lg:row-span-2 lg:col-span-2' />

      {/* Quick Links */}
      <FooterSection title='Quick Links' sectionDataList={footerData.footerQuickLinks}
        className='px-2.5 row-start-3 row-span-1 col-span-1 md:col-span-4 lg:row-start-1 lg:col-start-6 lg:row-span-2 lg:col-span-2' />

      {/* Newsletter Subscribe */}
      <div className="px-2.5 row-start-4 row-span-1 col-span-2 md:col-span-4 lg:row-start-1 lg:col-start-8 lg:row-span-1 lg:col-span-5">
        <NewsletterSubscribe />
      </div>

      {/* Social Links */}
      <div className="px-2.5 row-start-2 row-span-1 col-span-2 md:col-span-4 lg:row-start-2 lg:col-start-1 lg:row-span-1 lg:col-span-3">
        <h4 className="mb-2 font-semibold">Connect with Us</h4>
        <ul className="flex gap-4 mt-1">
          {socialLinks.map((listItem) => (
            <li key={listItem.href}>
              <Link className="block h-9 w-9 text-lg" href="/">{listItem.Icon}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Payments Mode */}
      <div className="px-2.5 row-start-5 row-span-1 col-span-2 md:col-span-4 lg:row-start-2 lg:col-start-8 lg:row-span-1 lg:col-span-3">
        <h4 className="mb-2 font-medium">{ }</h4>
        <ul className="flex gap-2 mt-1">
          {paymentsData.map((listItem) => (
            <li key={listItem.title}>
              <Link className="relative text-lg" href={"/"} >
                <Image src={listItem.Icon} alt="payment logo" height={24} width={24} className="object-contain" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Language selector */}
      <div className="px-2.5 row-start-6 row-span-1 col-span-2 md:col-span-4 lg:row-start-2 lg:col-start-11 lg:row-span-1 lg:col-span-2">
        <LanguageSelector variant='FOOTER' isDeviceMobile={false} />
      </div>
    </div>
  );
};

export default FooterNavigation;
