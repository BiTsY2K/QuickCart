import { i18nRouter } from "next-i18n-router";
import { i18nConfig } from "./lib/i18n/index";

import { NextRequest, NextResponse } from "next/server";
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

let locales = ['en-US', 'nl-NL', 'nl', 'zh'];
let defaultLocale = 'en-US';
const cookieName = "i18nlang";

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
  // Get locale from cookie
  if (request.cookies.has(cookieName)) return request.cookies.get(cookieName)!.value;

  // Get accept language from HTTP headers
  const acceptLang = request.headers.get("Accept-Language");
  if (!acceptLang) return defaultLocale;

  // Get match locale
  const headers = { "accept-language": acceptLang };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request: any) {
  if (request.nextUrl.pathname.startsWith("/_next")) return NextResponse.next();

  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`

  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  const response = NextResponse.redirect(request.nextUrl);
  response.cookies.set(cookieName, locale); // Set locale to cookie

  return response;
}

// Apply middleware only to relevant routes (excluding API, static files, and internal Next.js paths)
export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};



/**
 * RESOURCES:
 * 1. way to support multiple languages i18n in Next.js 14 (Based on App Router)
 *      - https://amonxu.medium.com/simply-way-to-support-multiple-languages-i18n-in-next-js-14-based-on-app-router-091ca74829e2
 *      - https://nextjs.org/docs/app/guides/internationalization
 * 
 */