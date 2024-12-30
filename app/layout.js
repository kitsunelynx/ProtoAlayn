import { Lato } from "next/font/google";
import "./globals.css";

const baskervville = Lato({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-lato',
});

export const metadata = {
  title: "Alayn",
  description: "Copyright (C) Mulkanten Technologies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${baskervville.variable}`}>
        {children}
      </body>
    </html>
  );
}
