import React from "react";
import axios from "axios";
import { notFound } from "next/navigation"; // Import Next.js 404 handler
import Slider from "@/app/components/Home/Slider";
import ServiceContant from "@/app/components/Services/ServiceContant";
import BreadcrumbSchema from "@/components/common/BreadcrumbSchema";

// Function to create a slug from a title
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .trim();
};

// Fetch service data
export async function fetchMetaData(slug) {
  const url = process.env.NEXT_PUBLIC_SERVER_URL;
  try {
    const response = await fetch(`${url}/smile-dental/our_services`, {
      method: "GET",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Failed to fetch metadata");

    const metaData = await response.json();
    return metaData.find((meta) => createSlug(meta?.service_name) === slug);
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return null;
  }
}

// Generate metadata
export const generateMetadata = async ({ params }) => {
  const metaData = await fetchMetaData(params?.slug);
  if (!metaData) notFound(); // Trigger 404 if metadata is missing

  return {
    title: metaData?.service_name || "Service Not Found",
    description: metaData?.meta_tag_description || "No description available.",
  };
};

// Component to display service details
const SlugPage = async ({ params }) => {
  const { slug } = params;
  let servicesData = [];
  let matchedService = null;

  try {
    const url = process.env.NEXT_PUBLIC_SERVER_URL;
    if (!url) throw new Error("Server URL is not defined");

    const response = await axios.get(`${url}/smile-dental/our_services`);
    if (response.status === 200) {
      servicesData = response.data;
      matchedService = servicesData.find(
        (service) => createSlug(service.service_name) === slug
      );
    }
  } catch (error) {
    console.error("Error fetching service data:", error);
  }

  // **Trigger 404 page if service not found**
  if (!matchedService) {
    notFound(); // 🚀 This automatically redirects to Next.js 404 page
  }

  return (
    <>
      <BreadcrumbSchema />
      <Slider pageName="services" showContactButton={false} />
      <ServiceContant clickedService={matchedService} />
    </>
  );
};

export default SlugPage;
