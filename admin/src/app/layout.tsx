"use client";

import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />

        <Navbar />

        <div className="app-content">
          <Sidebar />

          <main className="page-container">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}