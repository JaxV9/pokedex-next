'use client';
import { pokeTypesColorInit } from '@/data/pokeTypesColor';
import React from 'react';

export type pokeTypesColor = {
    type: string,
    background: string,
    text: string
};

const PokeTypesColorContext = React.createContext<pokeTypesColor[]>([]);

export default PokeTypesColorContext;