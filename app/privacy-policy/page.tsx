import Link from "next/link";
import { LegalPage } from "@/components/templates/LegalPage";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/data/site";
import { getSettings } from "@/lib/cms/content";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${site.legalName} collects, uses and protects personal information submitted through this website.`,
  path: "/privacy-policy",
});

export default async function PrivacyPolicyPage() {
  const settings = await getSettings();
  return (
    <LegalPage title="Privacy Policy" intro={`How ${settings.legalName} handles personal information collected through this website.`}>
      <h2>1. Who we are</h2>
      <p>
        This website is operated by {settings.legalName} (&ldquo;4axiz&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). We are responsible for the personal
        information described in this policy.
      </p>
      <h2>2. Information we collect</h2>
      <p>When you contact us through the website we collect the information you choose to provide, such as:</p>
      <ul>
        <li>your name, business email address, company name and, optionally, phone number;</li>
        <li>the service or solution you are interested in, an optional budget range and your message.</li>
      </ul>
      <p>Our hosting infrastructure may also record standard technical information such as IP address, browser type and pages visited, for security and reliability.</p>
      <h2>3. How we use information</h2>
      <ul>
        <li>to respond to your inquiry and discuss potential projects or products;</li>
        <li>to operate, secure and improve this website;</li>
        <li>to meet legal and regulatory obligations.</li>
      </ul>
      <p>We do not sell your personal information.</p>
      <h2>4. Sharing</h2>
      <p>
        We may share information with service providers who help us operate the website or manage inquiries, under appropriate confidentiality
        obligations, and where required by law.
      </p>
      <h2>5. International transfers</h2>
      <p>
        4axiz operates offices in Bangladesh, New Zealand and Kosovo. Your information may be accessed by our team in these locations to respond
        to your inquiry. We take reasonable steps to protect it wherever it is processed.
      </p>
      <h2>6. Retention</h2>
      <p>We keep inquiry information only as long as needed for the purposes above, or as required by law.</p>
      <h2>7. Your rights</h2>
      <p>
        Depending on where you live, you may have rights to access, correct or delete your personal information, or to object to certain
        processing. To make a request, please <Link href="/contact">contact us</Link>.
      </p>
      <h2>8. Changes</h2>
      <p>We may update this policy from time to time. The latest version will always be available on this page.</p>
    </LegalPage>
  );
}
