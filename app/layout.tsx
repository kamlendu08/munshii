import type { Metadata } from "next";
import CustomFont from 'next/font/local'
import "./globals.css";
import { MenubarDemo } from "./func/butt";
import { Providers } from "./providers";
import Footer from "./func/footer";

const consola = CustomFont({
  src: './fonts/CONSOLA.woff',
  variable: '--font-consola',
})

export const metadata: Metadata = {
  title: "Munshii",
  description: "Monitor Your Cash Flow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body
        className={`${consola.variable}`}
      >
        <Providers>
          <MenubarDemo />
          {children}
          <Footer/>
        </Providers>

      </body>
    </html>
  );
}
