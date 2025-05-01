import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/onboarding", "/onboarding/sign-up", "/sign-in"],
  afterAuth(auth, req) {
    // Handle authenticated users
    if (auth.userId) {
      // If they're trying to access auth pages, redirect to dashboard
      if (req.nextUrl.pathname.startsWith('/onboarding') || 
          req.nextUrl.pathname.startsWith('/sign-in') || 
          req.nextUrl.pathname.startsWith('/sign-up')) {
        const dashboard = new URL('/dashboard', req.url);
        return Response.redirect(dashboard);
      }
    }
    // Handle non-authenticated users
    else {
      // If they're trying to access protected pages, redirect to onboarding
      if (!req.nextUrl.pathname.startsWith('/onboarding') && 
          !req.nextUrl.pathname.startsWith('/sign-in') &&
          req.nextUrl.pathname !== '/') {
        const onboarding = new URL('/onboarding', req.url);
        return Response.redirect(onboarding);
      }
    }
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};