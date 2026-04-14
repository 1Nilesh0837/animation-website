import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair",
});

const dmsans = DM_Sans({ 
  subsets: ["latin"], 
  variable: "--font-dmsans",
});

export const metadata: Metadata = {
  title: "Godrej No.1 | Premium Natural Beauty Soap",
  description: "Experience the goodness of nature with Rose & Aloe Vera, Tulsi & Neem, and Saffron & Milk. Trusted by millions for silky, radiant skin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmsans.variable}`}>
      <body className="bg-black text-white font-dmsans overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
