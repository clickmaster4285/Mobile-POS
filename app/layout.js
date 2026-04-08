import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Clickmasters | Smart POS System for Mobile Shops",
  description: "Modern POS System for Mobile Shops. Streamline sales, inventory, and customer management with our powerful point-of-sale solution.",
  keywords: "POS system, mobile shop POS, retail software, inventory management, sales tracking",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} scroll-smooth antialiased`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
