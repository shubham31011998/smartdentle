import React from "react";
import Head from "next/head";
import BlogsDetails from "../components/Blogs/BlogsDetails";
import axios from "axios";
import Slider from "../components/Home/Slider";

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
    return null; // or some default value
  }
}

export const metadata = async () => {
  const metaData = await fetchMetaData("blogs");
  return {
    title: metaData?.meta_title,
    description: metaData?.meta_description,
    // Remove canonical URL
  };
}

// Schema Generator
const generateSchema = (blogsData) => {
  if (!blogsData || blogsData.length === 0) return null;

  const blogPostingSchema = blogsData.map((blog) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_SERVER_URL}/blogs/${blog.slug}`,
    },
    headline: blog.title,
    description: blog.description || blog.meta_description,
    image: blog.image_url, // Update to match your API response key
    author: {
      "@type": "Person",
      name: blog.author || "Unknown Author", // Replace if you have author data
    },
    publisher: {
      "@type": "Organization",
      name: "Smile Cloud Family Dental",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/logo.png`, // Update logo URL
      },
    },
    datePublished: blog.published_date, // Ensure this matches your API's key
  }));

  return blogPostingSchema;
};

const page = async () => {
  let blogsData = []; // Initialize to avoid reference errors
  let loading = true;

  try {
    const url = process.env.NEXT_PUBLIC_SERVER_URL;
    if (!url) {
      throw new Error("Server URL is not defined");
    }

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    };

    const response = await axios.get(`${url}/smile-dental/blogs`, options);

    if (response.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    blogsData = response.data;
    console.log(blogsData) // Corrected to assign properly
    loading = false;

    // Sort blogsData by published_date in descending order
    blogsData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  } catch (error) {
    console.error("Error fetching blogs data:", error);
    loading = false;
  }

  const schema = generateSchema(blogsData);

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
      <Slider pageName="blogs" showContactButton={false} />
      {loading ? (
        <div className="loader"></div> // Display loader while fetching data
      ) : (
        <BlogsDetails blogsData={blogsData} />
      )}
    </>
  );
};

export default page;
