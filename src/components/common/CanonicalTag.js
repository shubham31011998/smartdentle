"use client"; // Ensure this runs on the client side

import { usePathname } from "next/navigation";
// import Head from "next/head";

export default function CanonicalTag() {
  const pathname = usePathname(); // Get the current pathname
  const canonicalUrl = `https://smilecloudfamilydental.com${pathname}`;
  return (
    <>
      <link rel="canonical" href={canonicalUrl} />
    </>
  );
}
