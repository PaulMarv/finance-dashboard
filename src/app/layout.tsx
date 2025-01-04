
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { DesktopNav, MobileNav } from "../components/navbar";
import { UserProvider } from "@/components/providers/user-provider";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Overview, transactions and loans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          <section className="w-full  min-h-[100vh] ">
            <section className="w-full pb-8">
              <DesktopNav />
              <MobileNav />
              <div className="w-full ">
                <div className="w-full pt-12 min-h-[calc(100vh-82px)] ">
                  <div className="lg:pl-[200px] lg:pr-[10px] max-w-7xl mx-auto px-5">
                    {children}
                  </div>
                </div>
              </div>
            </section>
          </section>
        </UserProvider>
      </body>
    </html>
  );
}
