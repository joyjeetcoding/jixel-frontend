import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProviderWrapper from "@/context/AuthProvider";
import QueryWrapper from "@/context/QueryProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jixel",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={inter.className}>
        <QueryWrapper>
          <AuthProviderWrapper>
            <Toaster />
            {children}
          </AuthProviderWrapper>
        </QueryWrapper>
      </body>
    </html>
  );
}
