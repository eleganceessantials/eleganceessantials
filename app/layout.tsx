import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/navbar";


const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = { 
  title: "Elegance Essentials", 
  description: "Experience the true essence of elegance.",
  icons: {
    icon: "/logo.png",
  }
};

import NavbarWrapper from "./components/NavbarWrapper";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          <NavbarWrapper/>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
