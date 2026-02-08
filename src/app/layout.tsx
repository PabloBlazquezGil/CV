import type {Metadata} from 'next';
import { Alegreya } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

const alegreya = Alegreya({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-alegreya',
});

export const metadata: Metadata = {
  title: 'Pablo Blázquez Gil | Comunicador y Divulgador Científico',
  description: 'CV de Pablo Blázquez Gil, Comunicador y Divulgador Científico especializado en conectar la ciencia con la sociedad.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${alegreya.variable} dark`}>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
