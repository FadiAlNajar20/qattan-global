import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["en", "ar"] as const;
const DEFAULT_LOCALE = "en";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internal Next.js paths, static files, and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.includes(".") // static files
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a supported locale prefix
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!pathnameHasLocale) {
    // Detect locale from Accept-Language header
    const acceptLanguage = request.headers.get("accept-language") ?? "";
    const preferArabic = acceptLanguage.toLowerCase().includes("ar");
    const locale = preferArabic ? "ar" : DEFAULT_LOCALE;

    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
