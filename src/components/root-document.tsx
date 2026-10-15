import { Inter, JetBrains_Mono, Orbitron } from "next/font/google";
import "@/app/globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { JsonLd, organizationJsonLd } from "@/lib/json-ld";
import { htmlLang, type Locale } from "@/lib/i18n";

// Same three faces the previous site used: Orbitron for display, Inter for
// text, JetBrains Mono for the technical bits. Self-hosted by next/font, so
// no request leaves for Google Fonts at runtime.
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

const orbitron = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "700", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * The <html>/<body> shell shared by the Romanian and English root layouts
 * (route groups `(ro)` and `(en)`), so each language gets its own <html lang>
 * in the exported HTML. The Organization graph is language-independent.
 */
export function RootDocument({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html
      lang={htmlLang[locale]}
      suppressHydrationWarning
      className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationJsonLd} />
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
