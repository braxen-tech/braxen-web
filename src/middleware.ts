import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { routing } from "./i18n/routing";
import { LEGACY_SLUG_REDIRECTS } from "./lib/routes";

type Locale = (typeof routing.locales)[number];

const COUNTRY_TO_LOCALE: Record<string, Locale> = {
  BR: "pt",
  PT: "pt",
  AO: "pt",
  MZ: "pt",
  CV: "pt",
  GW: "pt",
  ST: "pt",
  TL: "pt",
  ES: "es",
  MX: "es",
  AR: "es",
  CO: "es",
  CL: "es",
  PE: "es",
  VE: "es",
  EC: "es",
  GT: "es",
  CU: "es",
  BO: "es",
  DO: "es",
  HN: "es",
  PY: "es",
  SV: "es",
  NI: "es",
  CR: "es",
  PA: "es",
  UY: "es",
  PR: "es",
  GQ: "es",
};

const LOCALE_PREFIX_RE = /^\/(pt|en|es)(\/|$)/;
const LOCALE_COOKIE = "NEXT_LOCALE";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function detectLocale(req: NextRequest): Locale {
  const country = (
    req.headers.get("x-vercel-ip-country") ??
    ""
  ).toUpperCase();
  if (country) {
    if (COUNTRY_TO_LOCALE[country]) return COUNTRY_TO_LOCALE[country];
    return "en";
  }
  const acceptLanguage = req.headers.get("accept-language") ?? "";
  if (acceptLanguage) {
    try {
      const languages = new Negotiator({
        headers: { "accept-language": acceptLanguage },
      }).languages();
      return match(
        languages,
        routing.locales as unknown as string[],
        routing.defaultLocale,
      ) as Locale;
    } catch {
      // fallthrough
    }
  }
  return routing.defaultLocale;
}

/** Rewrite legacy Portuguese slugs to canonical English slugs. */
function rewriteLegacySlug(pathname: string): string | null {
  const localeMatch = pathname.match(/^\/(pt|en|es)(\/.*)?$/);
  if (localeMatch) {
    const locale = localeMatch[1];
    const rest = localeMatch[2] ?? "";
    const segments = rest.replace(/^\//, "").split("/").filter(Boolean);
    const slug = segments[0];
    if (slug && LEGACY_SLUG_REDIRECTS[slug]) {
      segments[0] = LEGACY_SLUG_REDIRECTS[slug];
      return `/${locale}/${segments.join("/")}`;
    }
    return null;
  }

  const segments = pathname.replace(/^\//, "").split("/").filter(Boolean);
  const slug = segments[0];
  if (slug && LEGACY_SLUG_REDIRECTS[slug]) {
    segments[0] = LEGACY_SLUG_REDIRECTS[slug];
    return `/${segments.join("/")}`;
  }
  return null;
}

const intlMiddleware = createIntlMiddleware(routing);

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const legacyPath = rewriteLegacySlug(pathname);
  if (legacyPath && legacyPath !== pathname) {
    const url = req.nextUrl.clone();
    url.pathname = legacyPath;
    return NextResponse.redirect(url, 301);
  }

  const hasLocalePrefix = LOCALE_PREFIX_RE.test(pathname);

  if (!hasLocalePrefix) {
    const cookieLocale = req.cookies.get(LOCALE_COOKIE)?.value as
      | Locale
      | undefined;
    const locale =
      cookieLocale && (routing.locales as readonly string[]).includes(cookieLocale)
        ? (cookieLocale as Locale)
        : detectLocale(req);

    const url = req.nextUrl.clone();
    url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
    const res = NextResponse.redirect(url);
    res.cookies.set(LOCALE_COOKIE, locale, {
      path: "/",
      maxAge: ONE_YEAR_SECONDS,
      sameSite: "lax",
    });
    return res;
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
