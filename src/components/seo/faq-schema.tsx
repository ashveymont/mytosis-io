export function FAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does Mytosis reduce OTA commission dependency?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Mytosis installs AI voice and chat agents that answer every inbound call and message in real time — 24/7. When guests can reach your property directly, they book direct, and direct bookings carry zero OTA commission.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which PMS systems does Mytosis integrate with?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Mytosis integrates natively with Mews, Cloudbeds, and OPERA Cloud. The AI agents check live availability, quote real-time rates, and book reservations directly into your PMS — no manual entry, no double-bookings.',
        },
      },
      {
        '@type': 'Question',
        name: 'How quickly can Mytosis be deployed?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Website chat is live in under 30 minutes with a single script embed. Voice agent and WhatsApp setup takes longer, including PMS integration, voice cloning, and property-specific training.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Mytosis replace hotel front desk staff?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Mytosis handles routine call and chat volume — reservation enquiries, availability checks, modifications — so front desk staff can focus on in-person guest experience. Complex cases are routed to human staff with a full conversation transcript.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does the voice agent work in multiple languages?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. The Mytosis chat agent is multilingual and responds in the guest's language without routing delays. The voice agent can be configured for multiple languages depending on your primary guest markets.",
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
