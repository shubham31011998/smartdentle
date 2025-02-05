import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl;

  // Ensure the request is for "/services" and has a "search" query parameter
  if (url.pathname === "/services" && url.searchParams.has("search")) {
    const searchValue = decodeURIComponent(url.searchParams.get("search")); // Decode search parameter

    const redirectMap = {
      "Cleanings & Checkups": "/services/cleanings-and-checkups",
      "Cosmetic Dentistry": "/services/cosmetic-dentistry",
      "Emergency Dentist": "/services/emergency-dentist",
      "General Dentistry": "/services/general-dentistry", // Fixed extra "+"
      "Orthodontics": "/services/orthodontics",
      "Pediatric Dentistry": "/services/pediatric-dentistry",
      "Restorative Dentistry": "/services/restorative-dentistry",
      "Root Canals": "/services/root-canals",
      "Sedation Dentistry": "/services/sedation-dentistry",
    };

    const destination = redirectMap[searchValue];
    if (destination) {
      return NextResponse.redirect(new URL(destination, request.url), 301); // Explicitly set 301 status
    }
  }

  return NextResponse.next();
}

// Apply middleware only to "/services" route
export const config = {
  matcher: "/services",
};
