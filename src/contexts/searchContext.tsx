'use client';
import React from 'react';

type SearchContextType = {
    isSearching: boolean;
    setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchContext = React.createContext<SearchContextType | null>(null);

export default SearchContext;