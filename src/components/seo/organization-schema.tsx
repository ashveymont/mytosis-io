const siteUrl = 'https://www.mytosis.io'

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Mytosis',
    alternateName: 'Mytosis by Blackcrest Scaling',
    url: siteUrl,
    logo: `${siteUrl}/apple-icon`,
    description:
      'Hotel AI infrastructure — voice and chat agents for hotel groups. Integrates with Mews, Cloudbeds, and OPERA Cloud.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
    },
    parentOrganization: {
      '@type': 'Organization',
      name: 'Blackcrest Scaling',
      url: 'https://www.blackcrestscaling.com',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'av@blackcrestscaling.com',
      availableLanguage: ['English'],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
