import type { Metadata } from "next";
import { Geist_Mono, Roboto } from "next/font/google";
import "./globals.scss";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ইব্রাহিমপুর ঈশ্বর চন্দ্র উচ্চ বিদ্যালয় - Alumni Program",
  description:
    "Alumni Program Registration for Ibrahimpur Ishwar Chandra High School",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={`${roboto.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
