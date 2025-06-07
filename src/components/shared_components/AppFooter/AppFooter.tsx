import React from 'react';
import FooterNavigation from './FooterNavigation';

export interface AppFooterProps {
  className?: string,
}

const AppFooter: React.FC<AppFooterProps> = ({
  className, ...props
}) => {
  return (
    <footer {...props} className={`bg-white dark:bg-neutral-900 ${className}`}>
      <div className="md:container md:mx-auto pt-16 px-2">
        <FooterNavigation />
        <div className="text-xs py-4 text-center font-semibold">
          <span className="">
            <span className="">&copy; {new Date().getFullYear()}</span>{" "}
            <span>QuickCart.com</span>
          </span>
          <span className=""> &nbsp;|&nbsp;All rights reserved by BiTS DEVELOPMENT INC.</span>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
