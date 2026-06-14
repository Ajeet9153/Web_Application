"use client";

import "./globals.css";
import { useState } from "react";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import LoginPopup from "@/components/LoginPopup/LoginPopup";

import StoreProvider from "@/context/StoreContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showLogin, setShowLogin] =
    useState(false);

  return (
    <html lang="en">
      <body>
        <StoreProvider>
          {showLogin && (
            <LoginPopup
              setShowLogin={setShowLogin}
            />
          )}

          <Navbar
            setShowLogin={setShowLogin}
          />

          {children}

          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}