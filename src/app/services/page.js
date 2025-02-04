import React from "react";
import ServiceContant from "../components/Services/ServiceContant";
import axios from 'axios';
import Slider from "../components/Home/Slider";
import Head from "next/head";
import BreadcrumbSchema from "@/components/common/BreadcrumbSchema";

export async function fetchMetaData(pageName) {
    const url = process.env.NEXT_PUBLIC_SERVER_URL;
    const options = {
        method: "GET",
        cache: 'no-store',
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const response = await fetch(`${url}/smile-dental/metadata`, options);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const metaData = await response.json();
        // Find the metadata for the specific page
        return metaData.find(meta => meta?.page_name === pageName);
    } catch (error) {
        console.error('Error fetching metadata:', error);
        return null;
    }
}

export const metadata = async () => {
    const metaData = await fetchMetaData("services");
    return {
        canonical: 'https://smilecloudfamilydental.com/services', // Add canonical URL
        title: metaData?.meta_title,
        description: metaData?.meta_description,
    };
};

// Function to generate Service Schema
const generateServicesSchema = (metaData) => {
    if (!metaData) return null;

    return {
        "@context": "https://schema.org",
        "@type": "DentalService",
        name: metaData.meta_title || "Smile Cloud Family Dental Services",
        url: metaData.url || `${process.env.NEXT_PUBLIC_SERVER_URL}/services`,
        description:
            metaData.meta_description ||
            "Smile Cloud Family Dental offers a wide range of dental services including routine checkups, cosmetic treatments, implants, and more.",
        provider: {
            "@type": "Organization",
            name: "Smile Cloud Family Dental",
            url: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
            logo: `${process.env.NEXT_PUBLIC_SERVER_URL}/images/logo.png`,
            sameAs: [
                "https://www.facebook.com/smileclouddental",
                "https://www.instagram.com/smileclouddental",
                "https://www.twitter.com/smileclouddental",
            ],
        },
    };
};

const page = async () => {
    let servicesData = [];

    try {
        const url = process.env.NEXT_PUBLIC_SERVER_URL;
        if (!url) {
            throw new Error("Server URL is not defined");
        }

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
            },
        };

        const response = await axios.get(`${url}/smile-dental/our_services`, options);

        if (response.status !== 200) {
            throw new Error("Failed to fetch data");
        }

        servicesData = response.data;
    } catch (error) {
        console.error(error);
    }

    const metaData = await fetchMetaData("services");
    const schema = generateServicesSchema(metaData);

    return (
        <>
            <Head>
                {schema && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                    />
                )}
            </Head>
            <BreadcrumbSchema/>
            <Slider pageName="services" showContactButton={false} />
            <ServiceContant servicesData={servicesData} />
        </>
    );
};

export default page;
