import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar.jsx";
import { Providers } from "./Providers";

export const metadata = {
  title: "TriYoga",
  description: "TriYoga Aarhus",
};

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body>
        <Navbar />
        <Providers> {children}</Providers>

        <Footer />
      </body>
    </html>
  );
}
