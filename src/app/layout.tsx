import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-primary",
});

export const metadata: Metadata = {
  title: "Pablo Blázquez Gil | Senior UI/UX Designer & Frontend Developer",
  description: "Presentación profesional y portafolio de Pablo Blázquez Gil. Especialista en diseño UI/UX y desarrollo frontend.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${plusJakartaSans.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-[#2C5E43] selection:text-white">
        {children}
      </body>
    </html>
  );
}
