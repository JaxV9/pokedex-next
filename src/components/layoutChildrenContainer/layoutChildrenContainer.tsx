'use client';
import { ReactNode, useState } from "react";
import { Navbar } from "../navbar/navbar";
import Link from "next/link";

type LayoutChildrenContainer = {
    children : ReactNode
}

export const LayoutChildrenContainer =({ children }: LayoutChildrenContainer) => {
    const [navBarEnabled, setNavBarEnabled] = useState<boolean>(true);
  
    return (
      <div className={navBarEnabled ? "layoutChildrenContainerNavEnabled" : "layoutChildrenContainerNavDisabled"}>
        <Navbar navBarEnabledProps={navBarEnabled} setNavBarEnabledProps={setNavBarEnabled}/>
          <Link href="/">
            <img className="logoLayout" src="/assets/Pokedex-Next-logo.png" />
          </Link>
        {children}
      </div>
    );
  }