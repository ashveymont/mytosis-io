import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/ui/legal-page-layout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for mytosis.io, operated by Blackcrest Scaling.",
};

export default function TermsOfService() {
  return (
    <LegalPageLayout title="Terms of Service" updated="July 8, 2026">
      <p>
        These terms govern your use of mytosis.io (the &quot;Site&quot;),
        operated by Blackcrest Scaling, a Dubai, UAE-based company. By using
        the Site, you agree to these terms.
      </p>

      <h2>Use of the site</h2>
      <p>
        The Site is provided to give you information about Mytosis and to let
        you request access to the product. You agree to use the Site only for
        lawful purposes and not to submit false or misleading information
        through the access request form.
      </p>

      <h2>No guarantee of service</h2>
      <p>
        Mytosis is currently onboarding an early access cohort. Submitting
        the access request form does not guarantee acceptance, a specific
        response time, or availability of the product for your property.
      </p>

      <h2>Content and figures</h2>
      <p>
        Statistics and figures referenced on this Site (such as industry
        benchmarks and recovery estimates) are illustrative, based on stated
        assumptions, and are not a guarantee of results for any specific
        property or group.
      </p>

      <h2>Intellectual property</h2>
      <p>
        All content on this Site — including text, design, and the Mytosis
        name and branding — belongs to Blackcrest Scaling and may not be
        copied or reused without permission.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        The Site is provided &quot;as is&quot; without warranties of any
        kind. To the fullest extent permitted by law, Blackcrest Scaling is
        not liable for any indirect, incidental, or consequential damages
        arising from your use of the Site.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the United Arab Emirates,
        without regard to conflict of law principles.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to{" "}
        <a href="mailto:av@blackcrestscaling.com">av@blackcrestscaling.com</a>.
      </p>
    </LegalPageLayout>
  );
}
