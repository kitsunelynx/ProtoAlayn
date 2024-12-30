import { Baskervville } from "next/font/google";
import "./globals.css";

const baskervville = Baskervville({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-baskervville',
});

export const metadata = {
  title: "Alayn",
  description: "Copyright (C) Mulkanten Technologies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${baskervville.variable} font-serif`}>
        {children}
      </body>
    </html>
  );
}
