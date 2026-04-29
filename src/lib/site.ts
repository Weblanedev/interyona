/** Short display / storefront name. */
export function siteName() {
  return process.env.NEXT_PUBLIC_SITE_NAME || 'Yoventa'
}

/** Legal entity name. */
export function siteLegalName() {
  return process.env.NEXT_PUBLIC_LEGAL_NAME || 'Yoventa Limited'
}

/** Public website domain, without protocol (e.g. yoventaltd.com). */
export function siteDomain() {
  return process.env.NEXT_PUBLIC_SITE_DOMAIN || 'yoventaltd.com'
}

/** One-line business description. */
export function siteTagline() {
  return (
    process.env.NEXT_PUBLIC_TAGLINE ||
    'Sales of Computers and its accessories.'
  )
}
