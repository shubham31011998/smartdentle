import { Inter } from "next/font/google";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import Script from "next/script";

import "./globals.css";
import "./styles/aos.css"; 
import "./styles/base.css"; 
import "./styles/bootstrap.min.css"; 
import "./styles/flaticon.css"; 
import "./styles/fontawesome.css"; 
import "./styles/magnific-popup.css"; 
import "./styles/pbminfotech-base-icons.css"; 
import "./styles/responsive.css"; 
import "./styles/shortcode.css"; 
import "./styles/style.css"; 
import "./styles/swiper.min.css"; 
import "./styles/themify-icons.css"; 

import CallButton from "./components/Common/CallButton";
import ContactUsBar from "./components/Common/ContactUsBar";
import FlexBookLink from "./components/Common/FlexBook";
import CanonicalTag from "@/components/common/CanonicalTag";
import BreadcrumbSchema from "@/components/common/BreadcrumbSchema";

export const metadata = {
  title: "Your Site Title", 
  description: "Your site description", 
  keywords: "keyword1, keyword2, keyword3", 
  authors: [{ name: "Your Name" }], 
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://smilecloudfamilydental.com/',
    siteName: 'Smile Cloud Family Dental',
    images: [
      {
        url: '/path/to/image.jpg', 
        width: 800,
        height: 600,
        alt: 'Image description',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yourtwitterhandle', 
    title: 'Your Site Title', 
    description: 'Your site description', 
    image: '/path/to/image.jpg', 
  },
  canonical: 'https://smilecloudfamilydental.com/', 
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-CGSDEN7K1N"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-CGSDEN7K1N');  // Replace 'G-XXXXXXX' with your actual Measurement ID
              `,
            }}
          />
        <CanonicalTag />
        <Script type="application/ld+json" id="organization-schema">
          {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "SmileCloud Family Dental",
            "alternateName": "SmileCloud Family Dental",
            "description": "Providing quality dental care in Dallas, TX.",
            "url": "https://smilecloudfamilydental.com/",
            "logo": "https://smilecloudfamilydental.com/_next/image?url=https%3A%2F%2Fsmile-dental-buckett.s3.us-west-2.amazonaws.com%2Fsmile-dental-imags-prod%2F1730606988292.webp&w=1080&q=75",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1 (972) 972 4999",
              "contactType": "customer service",
              "areaServed": "IN",
              "availableLanguage": ["en", "Hindi", "es"]
            },
            "sameAs": [
              "https://www.youtube.com/@smilecloudfamilydental",
              "https://www.facebook.com/profile.php?id=61557541169170",
              "https://www.linkedin.com/company/smilecloud-family-dental/"
            ]
          }
          `}
        </Script>

        <Script type="application/ld+json" id="local-business-schema">
          {`
          {
            "@context": "https://schema.org",
            "@type": "Dentist",
            "url": "https://smilecloudfamilydental.com/",
            "logo": "https://smilecloudfamilydental.com/_next/image?url=https%3A%2F%2Fsmile-dental-buckett.s3.us-west-2.amazonaws.com%2Fsmile-dental-imags-prod%2F1730606988292.webp&w=1080&q=75",
            "image": "https://smile-dental-buckett.s3.us-west-2.amazonaws.com/smile-dental-imags/IMG-20240612-WA0004.jpg",
            "priceRange": "$$$",
            "hasMap": "https://maps.app.goo.gl/RPNaznyuCaPwMiwn8",
            "email": "info@smilecloudfamilydental.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Dallas",
              "addressRegion": "TX",
              "postalCode": "75220",
              "streetAddress": "2750 West Northwest Hwy, Suite 210",
              "addressCountry": "US"
            },
            "description": "Dentist in Dallas, TX",
            "name": "SmileCloud Family Dental of Dallas",
            "telephone": "(972) 972 4999",
            "openingHours": ["Mo,Tu,We,Th,Sa 9:00-16:00"],
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "32.858144",
              "longitude": "-96.874770"
            },
            "sameAs": ["https://www.facebook.com/profile.php?id=61557541169170"],
            "founder": ["Dr. Rohini Agarwal"]
          }
          `}
        </Script>

        <Script type="application/ld+json" id="website-schema">
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Smile Cloud Family Dental",
            "url": "https://smilecloudfamilydental.com/",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://smilecloudfamilydental.com/?s={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
          `}
        </Script>
      </head>
      <body>
        <div className="page-wrapper">
          <Header />
          {children}
          <ContactUsBar />
          <Footer />
          <CallButton />
          <FlexBookLink />
        </div>
      </body>
    </html>
  );
}
