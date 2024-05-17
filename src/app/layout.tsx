import type { Metadata } from "next";
import "./globals.css";
import { LayoutChildrenContainer } from "@/components/layoutChildrenContainer/layoutChildrenContainer";


export const metadata: Metadata = {
  title: "Pokedex-Next",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <LayoutChildrenContainer>
          {children}
        </LayoutChildrenContainer>
      </body>
    </html>
  );
}
