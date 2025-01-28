import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { CssBaseline } from "@mui/material";
import Container from "@/app/components/Container";
import Provider from "@/app/providers/provider";
import React from "react";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Starcoex Company Home",
  description: "Starcoex Company Homepage",
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
        <Provider>
          <AppRouterCacheProvider>
            {/*<ThemeProvider theme={darkTheme}>*/}
            <CssBaseline />
            <Container>{children}</Container>
            {/*</ThemeProvider>*/}
          </AppRouterCacheProvider>
        </Provider>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
