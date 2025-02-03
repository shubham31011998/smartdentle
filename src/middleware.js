import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl;

  // Redirect based on the 'search' query parameter
  if (url.pathname === '/services' && url.searchParams.has('search')) {
    const searchValue = url.searchParams.get('search');
    const redirectMap = {
      'Cleanings+%26+Checkups': '/services/cleanings-and-checkups',
      'Cosmetic+Dentistry': '/services/cosmetic-dentistry',
      'Emergency+Dentist': '/services/emergency-dentist',
      'General+Dentistry+': '/services/general-dentistry',
      'Orthodontics': '/services/orthodontics',
      'Pediatric+Dentistry': '/services/pediatric-dentistry',
      'Restorative+Dentistry': '/services/restorative-dentistry',
      'Root+Canals': '/services/root-canals',
      'Sedation+Dentistry': '/services/sedation-dentistry',
    };

    const destination = redirectMap[searchValue];
    if (destination) {
      return NextResponse.redirect(new URL(destination, request.url));
    }
  }

  return NextResponse.next();
}
