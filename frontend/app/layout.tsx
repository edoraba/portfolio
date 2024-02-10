import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const clashDisplay = localFont({
  src: "../public/fonts/ClashDisplay/ClashDisplay-Regular.ttf",
  variable: "--font-clashDisplay",
});

const switzer = localFont({
  src: "../public/fonts/Switzer/Switzer-Regular.ttf",
  variable: "--font-switzer",
});

export const metadata: Metadata = {
  title: "Edoardo Baravaglio · Devsigner",
  description:
    "Crafting engaging digital experiences with a blend of modern design and cutting-edge front-end development. Discover a portfolio where aesthetics meet functionality, showcasing innovative projects that bridge user needs with creative solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${clashDisplay.variable} ${switzer.variable} bg-black text-white font-switzer font-normal w-screen`}>
        {children}
      </body>
    </html>
  );
}

