import React from "react";
import Banner from "../components/Insurance/Banner";
import InsuranceContent from "../components/Insurance/InsuranceContent";
import Head from "next/head";

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

// Schema generator for "Insurance" page
const generateInsuranceSchema = (metaData) => {
  if (!metaData) return null;

  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: metaData.meta_title || "Smile Cloud Family Dental - Insurance Coverage",
    url: metaData.url || `${process.env.NEXT_PUBLIC_SERVER_URL}/insurance`,
    description:
      metaData.meta_description ||
      "Smile Cloud Family Dental offers a wide range of insurance options to help make dental care more affordable.",
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
    sameAs: [
      "https://www.facebook.com/smileclouddental",
      "https://www.instagram.com/smileclouddental",
      "https://www.twitter.com/smileclouddental",
    ],
  };
};

const page = async () => {
  // Fetch metadata for the "Insurance" page
  const metaData = await fetchMetaData("insurance");

  const schema = generateInsuranceSchema(metaData);

  return (
    <>
      <Head>
        {schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )}
        {/* Remove canonical URL */}
      </Head>
      <Banner />
      <InsuranceContent />
    </>
  );
};

export default page;
