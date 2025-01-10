// src/components/layout/Header/HeaderSchema.tsx
export default function HeaderSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://solvejet.net/#organization",
          name: "SolveJet",
          url: "https://solvejet.net",
          logo: {
            "@type": "ImageObject",
            url: "https://solvejet.net/logo.svg",
            width: 150,
            height: 40,
          },
          description:
            "Custom Software Development Company specializing in enterprise solutions",
          address: {
            "@type": "PostalAddress",
            streetAddress: "123 Business Street",
            addressLocality: "City",
            addressRegion: "State",
            postalCode: "12345",
            addressCountry: "US",
          },
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: "+1-234-567-890",
              email: "contact@solvejet.net",
              contactType: "customer service",
              areaServed: "Worldwide",
              availableLanguage: ["English"],
            },
          ],
          sameAs: [
            "https://facebook.com/solvejet",
            "https://twitter.com/solvejet",
            "https://linkedin.com/company/solvejet",
            "https://github.com/solvejet",
          ],
          foundingDate: "2024",
          founders: [
            {
              "@type": "Person",
              name: "Karan Shah",
            },
          ],
          numberOfEmployees: {
            "@type": "QuantitativeValue",
            minValue: "10",
            maxValue: "50",
          },
          knowsAbout: [
            "Software Development",
            "Web Applications",
            "Mobile Development",
            "Cloud Solutions",
            "Digital Transformation",
          ],
        }),
      }}
    />
  );
}
