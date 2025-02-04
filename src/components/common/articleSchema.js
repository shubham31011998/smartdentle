"use client";

import { usePathname } from "next/navigation";

const ArticleSchema = ({ metaTitle, metaDescription, blogImage, authorName, publishedDate, modifiedDate }) => {
  const pathname = usePathname();
  const pageUrl = `https://smilecloudfamilydental.com${pathname}`;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": pageUrl
    },
    "headline": metaTitle,
    "description": metaDescription,
    "image": blogImage,  
    "datePublished": publishedDate, 
    "dateModified": modifiedDate, 
    "author": {
      "@type": "Person",
      "name": authorName
    },  
    "publisher": {
      "@type": "Organization",
      "name": "SmileCloud Family Dental",
      "logo": {
        "@type": "ImageObject",
        "url": "https://smilecloudfamilydental.com/path-to-logo.png" // Replace with actual logo URL
      }
    }
  };

  return (
      <script
        type="application/ld+json"
        id="article-schema"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
  );
};

export default ArticleSchema;
