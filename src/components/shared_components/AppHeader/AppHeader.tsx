'use client';

// import BottomNavigationBar from './BottomNavigation';
import React from 'react';
import TopNagivationBar from '@/components/shared_components/AppHeader/components/NavigationBarTop';

export interface AppHeaderProps {
  className?: string,
}

const AppHeader: React.FC<AppHeaderProps> = ({
  className, ...props
}) => {
  const [prevScrollPos, setPrevScrollPos] = React.useState<number>(0);
  const [visible, setVisible] = React.useState<boolean>(true);

  // Control header visibility based on scroll direction
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isAtTop = currentScrollPos < 80;  // Make header visible when at the top
      const isScrollingUp = prevScrollPos > currentScrollPos;   // Make header visible when scrolling up.

      setVisible(isScrollingUp || isAtTop);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <div {...props} className={`nc-AppHeader sticky top-0 left-0 inset-x-0 shadow-sm z-50 w-full bg-neutral-100 dark:bg-neutral-900 transition-transform
      duration-300 border-b border-neutral-200 dark:border-gray-800 ${visible ? "translate-y-0" : "-translate-y-full"} ${className}`}
    >
      <div className="container mx-auto">
        <TopNagivationBar />
        {/* <BottomNavigationBar /> */}
      </div>
    </div>
  );
};

export default AppHeader;
