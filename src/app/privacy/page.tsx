import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/ui/legal-page-layout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Mytosis, by Blackcrest Scaling, collects, uses, and protects your data.",
};

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout title="Privacy Policy" updated="July 8, 2026">
      <p>
        Mytosis is operated by Blackcrest Scaling (&quot;we&quot;, &quot;us&quot;),
        a Dubai, UAE-based company. This policy explains what information we
        collect through mytosis.io, how we use it, and the choices you have.
      </p>

      <h2>Information we collect</h2>
      <p>When you use this website, we may collect:</p>
      <ul>
        <li>
          <strong>Information you submit</strong> — your name, work email, and
          hotel group / chain name, when you fill out the &quot;Request
          Access&quot; form.
        </li>
        <li>
          <strong>Usage data</strong> — pages viewed and general interaction
          data, collected via Google Analytics, only after you accept
          analytics cookies via the consent banner.
        </li>
      </ul>
      <p>
        We do not use tracking cookies, and no analytics data is collected,
        until you actively accept the cookie banner.
      </p>

      <h2>How we use it</h2>
      <ul>
        <li>To respond to your request and follow up about your property.</li>
        <li>To understand how visitors use this site and improve it.</li>
        <li>To maintain the security and reliability of the service.</li>
      </ul>
      <p>We do not sell your data, and we do not use it for advertising.</p>

      <h2>Who we share it with</h2>
      <p>We use a small number of service providers to operate this site:</p>
      <ul>
        <li>
          <strong>Resend</strong> — delivers the email notification when you
          submit the access request form.
        </li>
        <li>
          <strong>Vercel</strong> — hosts this website and stores form
          submissions.
        </li>
        <li>
          <strong>Google Analytics</strong> — provides anonymized usage
          statistics, only if you accept cookies.
        </li>
      </ul>
      <p>
        These providers process data on our behalf and are not permitted to
        use it for their own purposes.
      </p>

      <h2>Data retention</h2>
      <p>
        Form submissions are retained for as long as reasonably necessary to
        respond to your inquiry and maintain business records, after which
        they may be deleted. You can request deletion at any time (see
        below).
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you&apos;re located, you may have the right to
        access, correct, or delete the personal data we hold about you, or to
        object to its processing. To exercise any of these rights, contact us
        using the details below.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy or your data can be sent to{" "}
        <a href="mailto:av@blackcrestscaling.com">av@blackcrestscaling.com</a>.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. Material changes will be
        reflected by updating the date at the top of this page.
      </p>
    </LegalPageLayout>
  );
}
