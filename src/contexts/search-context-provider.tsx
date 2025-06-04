'use client';

import { SearchCommand } from '@/app/[lang]/admin/components/site-command';
import React from 'react';

type SearchContextType = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const SearchContext = React.createContext<SearchContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useSearch_context = () => {
  const searchContext = React.useContext(SearchContext);
  if (!searchContext) {
    throw new Error('useSearch_context has to be used within <SearchContext.Provider>');
  }

  return searchContext;
}


interface Props {
  children: React.ReactNode
};

export function SearchProvider({ children }: Props) {
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const keydownFunction = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', keydownFunction);
    return () => document.removeEventListener('keydown', keydownFunction);
  }, []);

  return (
    <SearchContext.Provider value={{ open, setOpen }}>
      {children}
      <SearchCommand />
    </SearchContext.Provider>
  )
}

