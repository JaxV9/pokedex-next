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

export const Navbar = ({ navBarEnabledProps, setNavBarEnabledProps }: navBarPropsType) => {

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
    }, [pathname])

    return (
        <>
            {isSearching ? <SearchBar toggleProps={toggleSearchBar} /> : null}
            <div className="burgerMenuContainer"
            style={navBarEnabledProps ?{background:"rgba(47, 47, 47, 0.768)"}:{background:"#2F2F2F"}}>
                <div onClick={toggleNavBar} className="burgerMenu"></div>
                <div onClick={toggleSearchBar} className="searchMenu"></div>
            </div>
            <div className={navBarEnabledProps ? "navBarContainer" : "navBarContainerDisabled"}>
                <div className="navBarIconContainer">
                    <div className="navBarButton">
                        <Link href="/">
                            <div className={currentPath === "/" ? "navBarIconFocused homeFocused" : "navBarIcon home"}>
                            </div>
                            <span className={currentPath === "/" ? "navLabelBtn navLabelFocused": "navLabelBtn"}>Home</span>
                        </Link>
                    </div>
                </div>
                <div id="navBarIconSearchContainer" className="navBarIconContainer">
                    <div onClick={toggleSearchBar} className="navBarSearchButton">
                        <div className="navBarIcon search">
                        </div>
                        <span className="navLabelBtn">Search</span>
                    </div>
                </div>
                <div className="navBarIconContainer">
                    <div className="navBarButton">
                        <Link href="/pokemon-library">
                            <div className={currentPath === "/pokemon-library" ? "navBarIconFocused pokeballFocused" : "navBarIcon pokeball"}>
                            </div>
                            <span className={currentPath === "/pokemon-library" ? "navLabelBtn navLabelFocused": "navLabelBtn"}>Pokémon library</span>
                        </Link>
                    </div>
                </div>
                <div className={navBarEnabledProps ? "navBarToggle" : "navBarToggleHide"}
                    onClick={toggleNavBar}>
                </div>
            </div>
        </>
    )
}
