import { faq } from '@/content/faq';
import { services } from '@/content/services';
import { reviews } from '@/content/reviews';
import { serviceArea, site } from '@/lib/site';

/**
 * LocalBusiness / CleaningService structured data.
 *
 * No street address is published (the owners work from home and asked that it
 * stay private), so `address` carries only the locality, region and country —
 * which is valid and still qualifies the business for local results.
 * aggregateRating is emitted only when genuine reviews exist.
 */
export default function StructuredData() {
  const business = {
    '@type': ['LocalBusiness', 'CleaningService', 'HomeAndConstructionBusiness'],
    '@id': `${site.url}/#business`,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    telephone: site.phone.e164,
    ...(site.email ? { email: site.email } : {}),
    image: `${site.url}/images/og/dolane-cleaning-og.png`,
    logo: `${site.url}/images/logo/dolane-cleaning-logo.png`,
    foundingDate: String(site.foundedYear),
    slogan: site.tagline,
    knowsLanguage: site.languages,
    priceRange: '$$',
    paymentAccepted: site.paymentMethods.join(', '),
    currenciesAccepted: 'USD',
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.location.city,
      addressRegion: site.location.stateCode,
      addressCountry: site.location.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.location.geo.latitude,
      longitude: site.location.geo.longitude,
    },
    areaServed: serviceArea.map((city) => ({
      '@type': 'City',
      name: city,
      containedInPlace: { '@type': 'State', name: site.location.state },
    })),
    founder: [
      { '@type': 'Person', name: 'Letici Dolane' },
      { '@type': 'Person', name: 'George' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cleaning Services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
          serviceType: service.title,
          provider: { '@id': `${site.url}/#business` },
          areaServed: { '@type': 'State', name: site.location.state },
        },
      })),
    },
    ...(reviews.length > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: (
              reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            ).toFixed(1),
            reviewCount: reviews.length,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { '@id': `${site.url}/#business` },
    inLanguage: 'en-US',
  };

  const faqPage = {
    '@type': 'FAQPage',
    '@id': `${site.url}/#faq`,
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  const graph = { '@context': 'https://schema.org', '@graph': [business, website, faqPage] };

  return (
    <script
      type="application/ld+json"
      // Static, developer-authored content — no user input reaches this string.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
