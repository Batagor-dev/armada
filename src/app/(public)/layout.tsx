import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit, Geist_Mono, Geist } from "next/font/google";
import Navbar from "../../../components/shared/navbar";
import Footer from "../../../components/shared/footer";
import { cn } from "@/lib/utils";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        </>
  );
}