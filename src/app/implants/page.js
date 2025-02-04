import React from "react";
import Banner from "../components/Implants/Banner";
import OtherLinkContent from "../components/Implants/ImplantsContent";
import Slider from "../components/Home/Slider";
import Head from "next/head";
import BreadcrumbSchema from "@/components/common/BreadcrumbSchema";

export async function fetchMetaData(pageName) {
  const url = process.env.NEXT_PUBLIC_SERVER_URL;

  const options = {
    method: "GET",
    cache: "no-store",
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

// Schema generator for "Implants" page
const generateImplantsSchema = (metaData, testimonials) => {
  if (!metaData) return null;

  const reviewSchema = testimonials?.map((testimonial) => ({
    "@type": "Review",
    author: {
      "@type": "Person",
      name: testimonial.name,
    },
    reviewBody: testimonial.message,
    reviewRating: {
      "@type": "Rating",
      ratingValue: testimonial.rating,
      bestRating: "5",
      worstRating: "1",
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: metaData.meta_title || "Smile Cloud Family Dental - Dental Implants",
    url: metaData.url || `${process.env.NEXT_PUBLIC_SERVER_URL}/implants`,
    description:
      metaData.meta_description ||
      "Smile Cloud Family Dental offers high-quality dental implants to restore your smile.",
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
    review: reviewSchema || [],
    sameAs: [
      "https://www.facebook.com/smileclouddental",
      "https://www.instagram.com/smileclouddental",
      "https://www.twitter.com/smileclouddental",
    ],
  };
};

const page = async () => {
  const url = process.env.NEXT_PUBLIC_SERVER_URL;

  // Fetch metadata for the "Implants" page
  const metaData = await fetchMetaData("implants");

  // Fetch testimonials
  let testimonials = [];
  try {
    const options = {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(`${url}/smile-dental/testimonials`, options);
    if (!response.ok) {
      throw new Error("Failed to fetch testimonials");
    }
    testimonials = await response.json();
  } catch (error) {
    console.error("Error fetching testimonials:", error);
  }

  const schema = generateImplantsSchema(metaData, testimonials);

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
      <BreadcrumbSchema/>
      <Banner />
      <OtherLinkContent testimonials={testimonials} />
    </>
  );
};

export default page;
