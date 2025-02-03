import React from "react";
import Map from "../components/Home/Map";
import Header from "../components/Common/Header";
import ContactDetails from "../components/ContactUs/ContactDetails";
import ContactForm from "../components/ContactUs/ContactForm";
import Slider from "../components/Home/Slider";
import Head from "next/head";

// Fetch metadata for the "Contact Us" page
export async function fetchMetaData(pageName) {
  const url = process.env.NEXT_PUBLIC_SERVER_URL;

  const options = {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(`${url}/smile-dental/metadata`, options);
    if (!response.ok) {
      throw new Error("Failed to fetch metadata");
    }
    const metaData = await response.json();
    return metaData.find((meta) => meta?.page_name === pageName);
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return null;
  }
}

// Schema generator for "Contact Us" page
const generateContactSchema = (metaData) => {
  if (!metaData) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: metaData.meta_title || "Smile Cloud Family Dental - Contact Us",
    url: metaData.url || `${process.env.NEXT_PUBLIC_SERVER_URL}/contact-us`,
    description:
      metaData.meta_description ||
      "Contact Smile Cloud Family Dental for all your dental care needs.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2750 West Northwest Hwy, Suite 210",
      addressLocality: "Dallas",
      addressRegion: "TX",
      postalCode: "75220",
      addressCountry: "US",
    },
    telephone: "+1 (972) 972 4999",
    email: "info@smileclouddental.com",
    openingHours: [
      "Mo-Fr 09:00-18:00",
      "Sa 09:00-13:00",
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: "32.8440",
      longitude: "-96.8757",
    },
    sameAs: [
      "https://www.facebook.com/smileclouddental",
      "https://www.instagram.com/smileclouddental",
      "https://www.twitter.com/smileclouddental",
    ],
  };
};

const page = async () => {
  const metaData = await fetchMetaData("contact us");
  const schema = generateContactSchema(metaData);

  return (
    <>
      <Head>
        {schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )}
        <link rel="canonical" href="https://smilecloudfamilydental.com/contactus" /> {/* Add canonical URL */}
      </Head>
      <Header />
      <Slider pageName="contact us" showContactButton={false} />
      <ContactDetails />
      <ContactForm />
      <Map />
    </>
  );
};

export default page;
