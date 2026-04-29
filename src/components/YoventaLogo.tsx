import type { SVGProps } from 'react'

const sizes = { sm: 28, md: 34, lg: 42 } as const

type Props = {
  /** Visual size of the mark */
  size?: keyof typeof sizes
  /** Show “Yoventa” wordmark next to the mark */
  showWordmark?: boolean
  className?: string
  /** Extra classes for the wordmark text */
  wordmarkClassName?: string
} & Omit<SVGProps<SVGSVGElement>, 'width' | 'height'>

/**
 * Yoventa storefront logo: monogram “Y” with a subtle cart arc.
 */
export function YoventaLogo({
  size = 'md',
  showWordmark = true,
  className = '',
  wordmarkClassName = '',
  ...svgProps
}: Props) {
  const px = sizes[size]
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width={px}
        height={px}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        {...svgProps}
      >
        <rect width="48" height="48" rx="12" className="fill-brand-600" />
        <text
          x="24"
          y="32"
          textAnchor="middle"
          fill="white"
          fontSize="22"
          fontWeight="700"
          fontFamily="var(--font-sora), system-ui, sans-serif"
        >
          Y
        </text>
        <path
          d="M34 16v4c0 1.5-.8 2.5-2 3"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>
      {showWordmark && (
        <span
          className={`font-display text-lg font-semibold tracking-tight text-brand-700 sm:text-xl ${wordmarkClassName}`}
        >
          Yoventa
        </span>
      )}
    </span>
  )
}
