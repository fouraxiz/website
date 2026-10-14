import Link from "next/link";
import { LegalPage } from "@/components/templates/LegalPage";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/data/site";
import { getSettings } from "@/lib/cms/content";

export const metadata = pageMetadata({
  title: "Terms of Service",
  description: `Terms governing the use of the ${site.legalName} website.`,
  path: "/terms-of-service",
});

export default async function TermsPage() {
  const settings = await getSettings();
  return (
    <LegalPage title="Terms of Service" intro={`The terms that apply when you use the ${settings.legalName} website.`}>
      <h2>1. Acceptance</h2>
      <p>By accessing or using this website you agree to these terms. If you do not agree, please do not use the website.</p>
      <h2>2. Website content</h2>
      <p>
        Content on this website is provided for general information about {settings.legalName}, its products and its services. It does not form an
        offer or contract. Product capabilities, module availability and pricing are confirmed separately for each engagement.
      </p>
      <h2>3. Intellectual property</h2>
      <p>
        Unless stated otherwise, the content, design, logos and trademarks on this website belong to {settings.legalName} or its licensors. You may not
        reproduce or reuse them without prior written permission.
      </p>
      <h2>4. Acceptable use</h2>
      <ul>
        <li>Do not attempt to gain unauthorised access to the website or its systems.</li>
        <li>Do not submit unlawful, misleading or malicious content through our forms.</li>
        <li>Do not use automated means to scrape or overload the website.</li>
      </ul>
      <h2>5. Third-party links</h2>
      <p>The website may link to third-party sites. We are not responsible for their content or practices.</p>
      <h2>6. Limitation of liability</h2>
      <p>
        The website is provided &ldquo;as is&rdquo;. To the extent permitted by law, {settings.legalName} is not liable for losses arising from use of the
        website or reliance on its content.
      </p>
      <h2>7. Privacy</h2>
      <p>
        Our handling of personal information is described in our <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
      <h2>8. Changes and contact</h2>
      <p>
        We may update these terms from time to time. Questions? <Link href="/contact">Contact us</Link>.
      </p>
    </LegalPage>
  );
}
