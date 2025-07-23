import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routeAccessMap } from "./lib/settings";
import { NextResponse } from "next/server";

const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}));

console.log("Middleware matchers:", matchers);

export default clerkMiddleware((auth, req) => {
  console.log("Middleware - Processing request for:", req.nextUrl.pathname);
  
  // Prevent undefined/null routes
  if (req.nextUrl.pathname === '/undefined' || req.nextUrl.pathname === '/null') {
    console.log("Middleware - Preventing undefined route, redirecting to /select-role");
    return NextResponse.redirect(new URL('/select-role', req.url));
  }

  // Allow access to role selection page without authentication
  if (req.nextUrl.pathname === '/select-role') {
    console.log("Middleware - Allowing access to select-role page");
    return NextResponse.next();
  }

  // Allow access to debug and home pages
  if (req.nextUrl.pathname === '/debug' || req.nextUrl.pathname === '/home') {
    console.log("Middleware - Allowing access to debug/home page");
    return NextResponse.next();
  }

  const { sessionClaims, userId } = auth();
  console.log("Middleware - User ID:", userId);
  console.log("Middleware - Session claims:", sessionClaims);

  // Get role from private metadata
  const role = (sessionClaims?.unsafeMetadata as { role?: string })?.role;
  console.log("Middleware - User role from unsafeMetadata:", role);

  // Check if user is accessing a dashboard route without authentication
  const isDashboardRoute = ['/admin', '/teacher', '/student', '/parent'].some(
    route => req.nextUrl.pathname.startsWith(route)
  );

  if (isDashboardRoute && !userId) {
    console.log("Middleware - Unauthenticated user trying to access dashboard, redirecting to sign-in");
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Check if authenticated user is accessing dashboard without role
  if (isDashboardRoute && userId && !role) {
    console.log("Middleware - Authenticated user without role trying to access dashboard, redirecting to select-role");
    return NextResponse.redirect(new URL('/select-role', req.url));
  }

  // Check role-based access
  for (const { matcher, allowedRoles } of matchers) {
    if (matcher(req)) {
      console.log("Middleware - Route matched:", req.nextUrl.pathname);
      console.log("Middleware - Allowed roles:", allowedRoles);
      console.log("Middleware - User role:", role);
      
      if (!allowedRoles.includes(role!)) {
        // If user has a role but it's not allowed for this route, redirect to their dashboard
        if (role && ['admin', 'teacher', 'student', 'parent'].includes(role)) {
          console.log("Middleware - User role not allowed for this route, redirecting to", `/${role}`);
          return NextResponse.redirect(new URL(`/${role}`, req.url));
        } else {
          // If no valid role, redirect to role selection
          console.log("Middleware - No valid role, redirecting to select-role");
          return NextResponse.redirect(new URL('/select-role', req.url));
        }
      }
    }
  }

  console.log("Middleware - Allowing request to proceed");
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
