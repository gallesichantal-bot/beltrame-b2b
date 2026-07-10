'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Leaf, Award, ArrowRight } from 'lucide-react'

/* ── Animated counter ──────────────────────────────────────────────── */
function AnimatedCounter({ to, duration = 1800 }: { to: number; duration?: number }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1)
          // ease-out cubic
          const ease = 1 - Math.pow(1 - t, 3)
          setVal(Math.round(ease * to))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [to, duration])

  return <span ref={ref}>{val.toLocaleString('it-IT')}</span>
}

/* ── I nostri numeri ───────────────────────────────────────────────── */
const STATS = [
  { to: 2900, prefix: '+', suffix: '', label: 'Dipendenti', sub: 'del gruppo' },
  { to: 3,    prefix: '+', suffix: ' MLN t', label: 'Capacità produttiva', sub: 'annua' },
  { to: 40,   prefix: '',  suffix: '+', label: 'Paesi', sub: 'presenza commerciale' },
  { to: 6,    prefix: '',  suffix: '', label: 'Aziende', sub: 'partecipate' },
  { to: 7,    prefix: '',  suffix: '', label: 'Stabilimenti', sub: 'produttivi' },
  { to: 4,    prefix: '',  suffix: '', label: 'Acciaierie', sub: 'a forno elettrico' },
]

export function NumbersBanner() {
  return (
    <div className="w-full" style={{ background: '#0F273C', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-screen-xl mx-auto px-6 py-14">
        {/* Titolo sezione — identico al sito */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-8 h-[2px]" style={{ background: '#de473c' }} />
            <span className="text-[11px] font-bold uppercase tracking-[3px]"
              style={{ color: 'rgba(255,255,255,0.35)' }}>AFV Gruppo Beltrame</span>
            <div className="w-8 h-[2px]" style={{ background: '#de473c' }} />
          </div>
          <h2 className="text-white font-black text-[28px] uppercase"
            style={{ letterSpacing: '2px' }}>
            I nostri numeri
          </h2>
        </div>

        {/* Counter grid — 6 elementi come sul sito */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0">
          {STATS.map((s, i) => (
            <div key={s.label}
              className="flex flex-col items-center text-center py-6 px-4"
              style={{
                borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : undefined,
              }}>
              {/* Numero grande rosso — identico al tema: text-dark-red alt-font */}
              <div className="font-black text-[42px] leading-none mb-2"
                style={{ color: '#de473c', letterSpacing: '-2px' }}>
                {s.prefix}
                <AnimatedCounter to={s.to} />
                {s.suffix}
              </div>
              {/* Label */}
              <div className="text-[11px] font-bold uppercase tracking-[1px] text-white mb-0.5">
                {s.label}
              </div>
              <div className="text-[10px] uppercase tracking-[1px]"
                style={{ color: 'rgba(255,255,255,0.35)' }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Attivo dal 1896 */}
        <div className="text-center mt-10">
          <p className="text-[12px] uppercase tracking-[2px] font-light"
            style={{ color: 'rgba(255,255,255,0.3)' }}>
            Attivo dal{' '}
            <span className="font-bold text-white/50">1896</span>
            {' '}nel settore siderurgico
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── Three banner cards ─────────────────────────────────────────────── */
const BANNERS = [
  {
    tag: 'Impegno ambientale',
    title: 'Sostenibilità',
    desc: 'AFV Beltrame persegue obiettivi ambiziosi di riduzione delle emissioni e di utilizzo di energia rinnovabile in tutti i suoi stabilimenti.',
    href: '#',
    bg: '#1c1c24',
    icon: <Leaf size={20} />,
    accent: '#de473c',
  },
  {
    tag: 'Green steel',
    title: 'Chalibria®',
    desc: 'Il nostro acciaio verde, prodotto con oltre il 70% di energia rinnovabile certificata. Richiedi i tuoi prodotti nella versione Chalibria.',
    href: '/catalog',
    bg: '#0F273C',
    icon: <Leaf size={20} />,
    accent: '#059669',
  },
  {
    tag: 'Qualità certificata',
    title: 'Certificazioni',
    desc: 'Tutti i nostri prodotti sono conformi alle norme EN e dispongono di certificazione di qualità. Scarica i documenti tecnici dalla tua area personale.',
    href: '/account',
    bg: '#de473c',
    icon: <Award size={20} />,
    accent: '#fff',
  },
]

export function BannerCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
      {BANNERS.map((b) => (
        <Link key={b.title} href={b.href}
          className="group relative flex flex-col justify-between p-8 min-h-[220px] overflow-hidden transition-all hover:brightness-110"
          style={{ background: b.bg }}>
          {/* Overlay leggero per profondità */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ background: 'linear-gradient(135deg, #fff 0%, transparent 60%)' }} />

          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-[2px]" style={{ background: b.accent === '#fff' ? 'rgba(255,255,255,0.5)' : b.accent }} />
              <span className="text-[10px] font-bold uppercase tracking-[2px]"
                style={{ color: b.accent === '#fff' ? 'rgba(255,255,255,0.6)' : `${b.accent}cc` }}>
                {b.tag}
              </span>
            </div>
            <h3 className="font-black text-[22px] uppercase text-white mb-3"
              style={{ letterSpacing: '1px' }}>
              {b.title}
            </h3>
            <p className="text-[13px] font-light leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.55)' }}>
              {b.desc}
            </p>
          </div>

          <div className="relative mt-6 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[1.5px] text-white/60 group-hover:text-white transition-colors">
            Scopri di più
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      ))}
    </div>
  )
}
