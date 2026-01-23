import type { Metadata } from 'next';
import { Inter, Pixelify_Sans, Nunito } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";

const inter = Inter({ subsets: ["latin"] });
const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixelify-sans",
  weight: ["400", "500", "600", "700"],
});
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "700", "800"],
});

export const metadata: Metadata = {
  title: "Ticketmaster Training for BTS",
  description: "Practice your ticket buying skills for the upcoming BTS tour with this training simulator. Get ready for the war!",
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: "Ticketmaster Training for BTS",
    description: "Practice your ticket buying skills for the upcoming BTS tour with this training simulator. Get ready for the war!",
    images: ['/socialimage.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ticketmaster Training for BTS",
    description: "Practice your ticket buying skills for the upcoming BTS tour with this training simulator. Get ready for the war!",
    images: ['/socialimage.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${pixelifySans.variable} ${nunito.variable}`}>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
