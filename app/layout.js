import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Clickmasters | Smart POS System for Mobile Shops",
  description: "Modern POS System for Mobile Shops. Streamline sales, inventory, and customer management with our powerful point-of-sale solution.",
  keywords: "POS system, mobile shop POS, retail software, inventory management, sales tracking",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth antialiased`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
