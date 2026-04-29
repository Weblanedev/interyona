import { PRODUCT_CATEGORIES } from '@/lib/categories'
import { fetchDummyJsonProducts } from '@/lib/dummyjson'
import { formatUsd, getUnitPrice } from '@/lib/pricing'
import type { StoreProduct } from '@/lib/store-types'

function line(p: StoreProduct) {
  const u = getUnitPrice(p.salePrice, p.regularPrice)
  const cat = p.categoryPath?.[0]?.name ?? ''
  const desc = (p.description || '').replace(/\s+/g, ' ').slice(0, 160)
  return `- SKU ${p.sku}: ${p.name} | ${cat} | ${p.manufacturer || 'Unknown brand'} | ${formatUsd(u)}. ${desc}`
}

/**
 * Fetches representative catalog lines per category for the AI assistant (server-only).
 * Safe to call from route handlers; tolerates API failures.
 */
export async function buildProductContextForAI(): Promise<string> {
  const header = [
    'Store focus: electronics (laptops and computers; tablets and accessories).',
    'Categories:',
    ...PRODUCT_CATEGORIES.map((c) => `  - ${c.label}: ${c.description}`),
    '',
    'Representative catalog items (prices in USD):',
  ].join('\n')

  const lines: string[] = [header]
  for (const c of PRODUCT_CATEGORIES) {
    try {
      const d = await fetchDummyJsonProducts(1, 14, { categorySlug: c.slug })
      for (const p of d.products) {
        lines.push(line(p))
      }
    } catch {
      lines.push(`(Catalog context unavailable for ${c.label} at this time.)`)
    }
  }
  return lines.join('\n')
}
