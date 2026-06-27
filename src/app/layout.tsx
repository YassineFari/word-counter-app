import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";

export const metadata: Metadata = {
  title: "Free Online Word Counter Tool",
  description:
    "Free online text analysis tools. Count words, characters, sentences, paragraphs, and calculate reading time. Fast, accurate, and privacy-focused.",
  keywords: [
    "word counter",
    "character counter",
    "sentence counter",
    "paragraph counter",
    "reading time calculator",
    "text tools",
    "writing tools",
  ],
  openGraph: {
    title: "TextToolsHub - Free Online Text Analysis Tools",
    description:
      "Free online text analysis tools. Count words, characters, sentences, paragraphs, and calculate reading time.",
    url: "https://texttoolshub.com",
    siteName: "TextToolsHub",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TextToolsHub - Free Online Text Analysis Tools",
    description:
      "Free online text analysis tools. Count words, characters, sentences, paragraphs, and calculate reading time.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://texttoolshub.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css"
        />
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){}})()`
        }} />
      </head>
      <body className="bg-bg text-text min-h-screen flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            <div className="bg-primary text-white text-center text-sm sm:text-base md:text-lg py-3 px-4 font-bold tracking-wide animate-pulse">
              ✨ Analyze, improve, and optimize your text in seconds. 100% free, no account required, and ready to use instantly.
            </div>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
