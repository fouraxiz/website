import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { TopBar } from "@/components/layout/TopBar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/data/site";
import { getErpModules, getNav, getSettings } from "@/lib/cms/content";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", display: "swap", weight: ["500", "600", "700", "800"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.legalName} — Enterprise Software, ERP & AI Solutions`,
    template: `%s | ${site.legalName}`,
  },
  description: site.description,
  applicationName: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.legalName,
    title: `${site.legalName} — Enterprise Software, ERP & AI Solutions`,
    description: site.description,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.legalName} — Enterprise Software, ERP & AI Solutions`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

/** Content is edited live from the site, so pages render per request (data itself is cached). */
export const dynamic = "force-dynamic";

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [settings, nav, erp] = await Promise.all([getSettings(), getNav(), getErpModules()]);
  const sameAs = settings.socials.map((s) => s.url).filter(Boolean);
  const erpLinks = erp.map((m) => ({ label: m.shortTitle, href: `/solutions/erp/${m.slug}`, icon: m.icon }));
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.legalName,
            alternateName: site.name,
            url: site.url,
            ...(sameAs.length ? { sameAs } : {}),
            ...(settings.email ? { email: settings.email } : {}),
            ...(settings.phone ? { telephone: settings.phone } : {}),
            ...(settings.foundedYear ? { foundingDate: String(settings.foundedYear) } : {}),
            address: {
              "@type": "PostalAddress",
              streetAddress: "Level-4, House #34, Lane #6/2, Road #20/B, DUIP Plot, Block D, Mirpur-12",
              addressLocality: "Dhaka",
              postalCode: "1216",
              addressCountry: "BD",
            },
          }}
        />
        <TopBar />
        <Header nav={nav} erpLinks={erpLinks} phone={settings.phone} />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
