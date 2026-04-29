'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

import { formatUsd } from '@/lib/pricing'

export type HeroSlide =
  | {
      id: string
      kind: 'promo'
      /** Short line above the headline — avoids generic “Featured” */
      kicker?: string
      title: string
      description: string
      cta: { href: string; label: string }
      accent: 'gold' | 'cyan'
    }
  | {
      id: string
      kind: 'category'
      title: string
      description: string
      href: string
      tag: string
    }
  | {
      id: string
      kind: 'product'
      name: string
      price: number
      image?: string
      href: string
    }

const INTERVAL_MS = 8500

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [i, setI] = useState(0)
  const reduceMotion = useReducedMotion()

  const next = useCallback(() => {
    setI((k) => (slides.length ? (k + 1) % slides.length : 0))
  }, [slides.length])

  const prev = useCallback(() => {
    setI((k) => (slides.length ? (k - 1 + slides.length) % slides.length : 0))
  }, [slides.length])

  useEffect(() => {
    if (slides.length < 2 || reduceMotion) return
    const t = window.setInterval(next, INTERVAL_MS)
    return () => window.clearInterval(t)
  }, [next, slides.length, reduceMotion])

  if (slides.length === 0) return null

  const s = slides[i]!

  const indexLabel = String(i + 1).padStart(2, '0')
  const totalLabel = String(slides.length).padStart(2, '0')

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-emerald-900/[0.07] bg-white shadow-[0_28px_90px_-32px_rgba(5,80,60,0.28)]">
      {/* Soft brand wash — not a flat dark hero */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.97]"
        aria-hidden
      >
        <div className="absolute -left-1/4 top-0 h-[120%] w-[70%] rotate-[8deg] rounded-[100%] bg-gradient-to-br from-emerald-100/90 via-emerald-50/40 to-transparent blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-gradient-to-tl from-teal-200/30 to-transparent blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_0%,rgba(255,255,255,0.85)_38%,rgba(255,255,255,0.4)_62%,transparent_100%)]" />
      </div>

      {/* Top bar: index + arrows — editorial, not a bottom dot strip */}
      {slides.length > 1 && (
        <div className="relative z-20 flex items-center justify-between gap-4 border-b border-slate-200/60 px-5 py-3 sm:px-8">
          <p className="font-mono text-xs font-medium tabular-nums text-slate-500">
            <span className="text-slate-800">{indexLabel}</span>
            <span className="mx-1 text-slate-400">/</span>
            <span>{totalLabel}</span>
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={prev}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white/90 text-lg text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-800"
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white/90 text-lg text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-800"
              aria-label="Next slide"
            >
              ›
            </button>
          </div>
        </div>
      )}

      <div className="relative z-10 min-h-[min(420px,78vw)] sm:min-h-[400px]">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={s.id}
            className="absolute inset-0"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -8, transition: { duration: 0.2 } }
            }
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            {s.kind === 'promo' && (
              <div className="grid h-full lg:grid-cols-[minmax(0,1.08fr)_minmax(280px,0.92fr)]">
                <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:py-14 lg:pl-12 xl:pr-6">
                  <span
                    className={`inline-flex w-fit max-w-full rounded-full px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${
                      s.accent === 'gold'
                        ? 'border border-amber-200/80 bg-amber-50 text-amber-900'
                        : 'border border-emerald-200/90 bg-emerald-50 text-emerald-900'
                    }`}
                  >
                    {s.kicker ?? 'Curated drop'}
                  </span>
                  <h2 className="mt-5 max-w-[18ch] font-display text-3xl font-semibold leading-[1.12] tracking-tight text-slate-900 sm:text-4xl lg:text-[2.65rem] lg:leading-[1.08]">
                    {s.title}
                  </h2>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-[1.05rem]">
                    {s.description}
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link
                      href={s.cta.href}
                      className={`inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold shadow-md transition ${
                        s.accent === 'gold'
                          ? 'bg-amber-500 text-slate-900 hover:bg-amber-400'
                          : 'bg-emerald-600 text-white shadow-emerald-900/10 hover:bg-emerald-500'
                      }`}
                    >
                      {s.cta.label}
                    </Link>
                  </div>
                </div>
                {/* Abstract panel — geometric, not a stock hero photo */}
                <div className="relative hidden min-h-[280px] lg:block">
                  <div className="absolute inset-y-8 right-6 left-4 overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-emerald-600 via-emerald-700 to-slate-900 shadow-inner">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20fill-opacity%3D%22.06%22%20d%3D%22M0%200h40v40H0z%22%2F%3E%3Cpath%20fill%3D%22none%22%20stroke%3D%22%23ffffff%22%20stroke-opacity%3D%22.12%22%20d%3D%22M0%200l40%2040M40%200L0%2040%22%2F%3E%3C%2Fsvg%3E')] opacity-90" />
                    <div className="absolute -right-8 top-1/4 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute bottom-8 left-8 h-24 w-24 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm" />
                    <div className="absolute right-10 bottom-12 h-16 w-32 rotate-[-12deg] rounded-lg bg-gradient-to-r from-amber-300/40 to-transparent" />
                  </div>
                </div>
              </div>
            )}

            {s.kind === 'category' && (
              <div className="grid h-full items-stretch lg:grid-cols-[minmax(0,1.1fr)_minmax(240px,0.9fr)]">
                <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:py-14 lg:pl-12">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-6xl font-bold tabular-nums leading-none text-emerald-600/25 sm:text-7xl">
                      {s.title.slice(0, 1)}
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800/80">
                        {s.tag}
                      </p>
                      <h2 className="mt-1 font-display text-2xl font-semibold text-slate-900 sm:text-3xl">
                        {s.title}
                      </h2>
                    </div>
                  </div>
                  <p className="mt-4 max-w-lg text-slate-600">{s.description}</p>
                  <Link
                    href={s.href}
                    className="mt-8 inline-flex w-max items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Browse
                    <span aria-hidden className="text-emerald-300">
                      →
                    </span>
                  </Link>
                </div>
                <div className="relative hidden lg:flex lg:items-end lg:justify-end lg:pb-10 lg:pr-10">
                  <div className="h-52 w-full max-w-sm rounded-[1.75rem] border border-slate-200/80 bg-gradient-to-tr from-white to-emerald-50/80 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)] ring-1 ring-emerald-100/80" />
                </div>
              </div>
            )}

            {s.kind === 'product' && (
              <div className="grid h-full lg:grid-cols-2">
                <div className="relative order-2 flex min-h-[220px] items-center justify-center bg-gradient-to-b from-slate-50/50 to-white px-6 py-8 lg:order-1 lg:min-h-0 lg:py-10">
                  <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-lg shadow-slate-900/5">
                    {s.image ? (
                      <Image
                        src={s.image}
                        alt={s.name}
                        fill
                        className="object-contain p-5"
                        sizes="(max-width:1024px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="flex h-full min-h-[200px] items-center justify-center text-sm text-slate-400">
                        No image
                      </div>
                    )}
                  </div>
                </div>
                <div className="order-1 flex flex-col justify-center px-6 py-10 sm:px-10 lg:order-2 lg:py-14 lg:pr-12">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700/90">
                    In the window
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold leading-tight text-slate-900 sm:text-3xl">
                    {s.name}
                  </h2>
                  <p className="mt-4 font-mono text-2xl text-slate-800">
                    {formatUsd(s.price)}
                  </p>
                  <Link
                    href={s.href}
                    className="mt-7 inline-flex w-max rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-900/15 transition hover:bg-emerald-500"
                  >
                    Open product
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Step rail — vertical ticks, NOT pill dots */}
      {slides.length > 1 && (
        <div className="relative z-20 flex gap-1 border-t border-slate-200/70 px-4 py-3 sm:px-6">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setI(idx)}
              className={`group flex flex-1 flex-col gap-2 rounded-xl px-2 py-2 text-left transition sm:px-3 ${
                idx === i
                  ? 'bg-emerald-50/90 ring-1 ring-emerald-200/90'
                  : 'hover:bg-slate-50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={idx === i ? 'true' : undefined}
            >
              <span
                className={`font-mono text-[10px] font-medium tabular-nums sm:text-xs ${
                  idx === i ? 'text-emerald-800' : 'text-slate-400'
                }`}
              >
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span
                className={`h-0.5 w-full rounded-full transition ${
                  idx === i ? 'bg-emerald-500' : 'bg-slate-200 group-hover:bg-slate-300'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
