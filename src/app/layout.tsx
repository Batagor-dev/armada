import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit, Geist_Mono, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "../../components/shared/navbar";
import Footer from "../../components/shared/footer";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ArmadaKita - Sewa Mobil & Kendaraan Premium Terpercaya",
  description:
    "Penyedia layanan sewa mobil terpercaya dengan koleksi armada eksklusif untuk kenyamanan perjalanan Anda. Booking online cepat dan mudah.",
  keywords: ["sewa mobil", "rental mobil", "lepas kunci", "dengan sopir", "armada premium", "booking kendaraan"],
  openGraph: {
    title: "ArmadaKita - Sewa Kendaraan Premium #1 Indonesia",
    description: "Booking kendaraan premium dengan armada terbaik. Lepas kunci maupun dengan sopir profesional.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={cn("h-full", "antialiased", plusJakarta.variable, outfit.variable, geistMono.variable, "font-sans", geist.variable)}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}