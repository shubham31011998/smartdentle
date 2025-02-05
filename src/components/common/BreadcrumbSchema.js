"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Head from "next/head";

const BreadcrumbSchema = () => {
  const pathname = usePathname();
  const [breadcrumbList, setBreadcrumbList] = useState([]);

  useEffect(() => {
    if (!pathname) return;

    const pathSegments = pathname.split("/").filter(Boolean);
    const baseUrl = "https://smilecloudfamilydental.com";

    const newBreadcrumbList = pathSegments.map((segment, index) => ({
      "@type": "ListItem",
      position: index + 2,
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      item: `${baseUrl}/${pathSegments.slice(0, index + 1).join("/")}`,
    }));

    newBreadcrumbList.unshift({
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: baseUrl,
    });


    setBreadcrumbList(newBreadcrumbList);
  }, [pathname]);

  if (!breadcrumbList.length) {
    console.warn("⚠️ Breadcrumb list is empty, script won't render.");
    return null;
  }

  return (
      <script
        type="application/ld+json"
        id="dynamic-breadcrumb-schema"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbList,
          }),
        }}
      />
  );
};

export default BreadcrumbSchema;
