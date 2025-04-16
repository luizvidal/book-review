// Note: This middleware file is not used in this project since we're using localStorage for authentication
// Instead, we handle authentication client-side in the AuthProvider component
// This file is kept as a reference for server-side authentication in the future

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // For client-side authentication with localStorage, we don't need server-side middleware
  // This is just a placeholder
  return NextResponse.next();
}

export const config = {
  matcher: [
    // We're not matching any paths since we're handling auth client-side
    // This is just a placeholder configuration
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
