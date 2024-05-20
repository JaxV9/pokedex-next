'use client';
import Link from "next/link";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { usePathname } from 'next/navigation'
import { SearchBar } from "../searchBar/searchBar";
import SearchContext from "@/contexts/searchContext";

type navBarPropsType = {
    navBarEnabledProps: boolean,
    setNavBarEnabledProps: Dispatch<SetStateAction<boolean>>
}

export const Navbar = ({navBarEnabledProps, setNavBarEnabledProps}: navBarPropsType) => {

    const { isSearching, setIsSearching } = useContext(SearchContext)!;

    const pathname = usePathname()

    const [currentPath, setCurrentPath] = useState<string>('')

    const toggleNavBar = () => {
        setNavBarEnabledProps(!navBarEnabledProps)
    }

    const toggleSearchBar = (event: React.MouseEvent) => {
        setIsSearching(!isSearching)
    }

    useEffect(() => {
        setCurrentPath(pathname)
    },[pathname])

    return(
        <>
            {isSearching ? <SearchBar toggleProps={toggleSearchBar}/> : null}
            <div className={navBarEnabledProps ? "navBarContainer" : "navBarContainerDisabled" }>
                <div className="navBarButton">
                    <Link href="/">
                        <div className={currentPath === "/" ? "navBarIconFocused homeFocused":"navBarIcon home"}></div>
                    </Link>
                </div>
                <div onClick={toggleSearchBar} className="navBarSearchButton">
                    <div className={currentPath === "/search" ? "navBarIconFocused searchFocused":"navBarIcon search"}></div>
                </div>
                <div className="navBarButton">
                    <Link href="/pokemon-library">
                        <div className={currentPath === "/pokemon-library" ? "navBarIconFocused pokeballFocused":"navBarIcon pokeball"}></div>
                    </Link>
                </div>

                <div className="navBarToggle"
                style={navBarEnabledProps ? { backgroundImage: "url(/assets/arrow-left.svg)" } :
                { backgroundImage: "url(/assets/arrow-right.svg)" }} onClick={toggleNavBar}></div>
            </div>
            
        </>
    )
}
