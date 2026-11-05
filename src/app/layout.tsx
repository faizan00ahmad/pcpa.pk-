import type { Metadata } from "next";
import { Noto_Nastaliq_Urdu, Public_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LanguageProvider } from "@/components/LanguageProvider";
import { SearchDialog } from "@/components/SearchDialog";
import { T } from "@/components/T";
import { TopBar } from "@/components/TopBar";
import "./globals.css";

const publicSans = Public_Sans({ subsets: ["latin"], variable: "--font-public", display: "swap" });
const urdu = Noto_Nastaliq_Urdu({ subsets: ["arabic"], variable: "--font-urdu", display: "swap" });

export const metadata: Metadata = {
  title: "PCPA – Pakistan Crop Protection Association",
  description: "Pakistan Crop Protection Association",
};

/** Applies saved language, text size and contrast before first paint (no flash). */
const initScript = `try{var d=document.documentElement,s=localStorage;if(s.getItem('pcpa-lang')==='ur'){d.lang='ur';d.dir='rtl'}var f=s.getItem('pcpa-fs');if(f)d.dataset.fs=f;if(s.getItem('pcpa-contrast')==='1')d.dataset.contrast='high';if(sessionStorage.getItem('pcpa-intro')==='1')d.dataset.intro='seen'}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${publicSans.variable} ${urdu.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
      </head>
      <body>
        <LanguageProvider>
          <a href="#main" className="skip-link">
            <T>Skip to main content</T>
          </a>
          <TopBar />
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <SearchDialog />
        </LanguageProvider>
      </body>
    </html>
  );
}
