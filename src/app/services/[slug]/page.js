import React from "react";
import axios from "axios";
import Slider from "@/app/components/Home/Slider";
import ServiceContant from "@/app/components/Services/ServiceContant";
import FullServiceDetails from "@/app/components/Services/FullServiceDetails";

// Function to create a slug from a title
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .trim();
};

export async function fetchMetaData(slug) {
    const url = process.env.NEXT_PUBLIC_SERVER_URL;
    const options = {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(`${url}/smile-dental/our_services`, options);
      if (!response.ok) {
        throw new Error("Failed to fetch metadata");
      }
      const metaData = await response.json();
      return metaData.find((meta) => createSlug(meta?.service_name) === slug);
    } catch (error) {
      console.error("Error fetching metadata:", error);
      return null; // or some default value
    }
  }

  export const generateMetadata = async ({ params }) => {
    const metaData = await fetchMetaData(params.slug); 
    return {
      title: metaData?.service_name || "service Not Found", 
      description: metaData?.meta_tag_description || "No description available.",
    };
  };

// Fetch blog data directly in the component
const SlugPage = async ({ params }) => {
  const { slug } = params;
  let servicesData = [];
  let matchedService = null;

  try {
    const url = process.env.NEXT_PUBLIC_SERVER_URL;
    if (!url) {
      throw new Error("Server URL is not defined");
    }

    const response = await axios.get(`${url}/smile-dental/our_services`);

    if (response.status === 200) {
      servicesData = response.data;
      matchedService = servicesData.find(
        (service) => createSlug(service.service_name) === slug
      );
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching blogs data:", error);
  }

  return (
    <>
      <Slider pageName="services" showContactButton={false} />
      {matchedService ? (
        // <FullServiceDetails servicesData={matchedService} />
        <ServiceContant clickedService={matchedService} />
      ) : (
        <p>service not found</p>
      )}
    </>
  );
};

export default SlugPage;
