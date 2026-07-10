'use client'

import { useActionState } from 'react'
import { loginAction } from '@/lib/actions'
import { NumbersBanner, BannerCards } from '@/components/DashboardBanners'
import { AfvLogo } from '@/components/Logo'

const initialState = { error: '' }

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState)

  return (
    <div className="flex flex-col">

      {/* ══════════════════════════════════════════════════════════════
          HERO — full-bleed dark background
      ══════════════════════════════════════════════════════════════ */}
      <div className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: '#0c1a2e' }}>

        {/* ── Glow rosso in basso a sinistra ───────────────────────── */}
        <div className="absolute bottom-0 left-0 w-[700px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at bottom left, rgba(222,71,60,0.14) 0%, transparent 60%)' }}
        />

        {/* ── Glow blu chiaro in alto a destra ─────────────────────── */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(30,80,140,0.25) 0%, transparent 65%)' }}
        />

        {/* ── Contenuto principale ─────────────────────────────────── */}
        <div className="relative flex-1 flex items-stretch">

          {/* ──────────────── LEFT: brand + headline ──────────────── */}
          <div className="hidden lg:flex lg:w-[55%] flex-col justify-between px-16 xl:px-24 py-14">

            {/* Logo */}
            <div>
              <AfvLogo className="h-11 w-auto" variant="dark" />
            </div>

            {/* Headline centrale */}
            <div>
              {/* Accent bar */}
              <div className="flex items-center gap-3 mb-8">
                <div className="h-[3px] w-12" style={{ background: '#de473c' }} />
                <span className="text-[11px] font-bold uppercase tracking-[3px]"
                  style={{ color: 'rgba(255,255,255,0.35)' }}>Portale Clienti B2B</span>
              </div>

              <h1 className="font-black uppercase leading-[1.05] mb-6"
                style={{ color: '#fff', fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-1px' }}>
                We promise<br />
                a better quality<br />
                <span style={{
                  color: 'transparent',
                  WebkitTextStroke: '2px #de473c',
                }}>of urban life.</span>
              </h1>

              <p className="text-[15px] font-light leading-relaxed max-w-sm"
                style={{ color: 'rgba(255,255,255,0.4)' }}>
                Accedi al portale per gestire ordini, preventivi, documenti e tracking in tempo reale.
              </p>
            </div>

            {/* Stats in basso */}
            <div className="grid grid-cols-3 gap-0 pt-8"
              style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              {[
                { n: '+2.900', label: 'Dipendenti' },
                { n: '+3 MLN t', label: 'Capacità annua' },
                { n: '40+ paesi', label: 'Presenza globale' },
              ].map(s => (
                <div key={s.label}>
                  <div className="font-black text-xl text-white" style={{ letterSpacing: '-0.5px' }}>{s.n}</div>
                  <div className="text-[10px] uppercase tracking-[2px] font-light mt-1"
                    style={{ color: 'rgba(255,255,255,0.3)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ──────────────── RIGHT: form card ───────────────────── */}
          <div className="flex-1 flex items-center justify-center px-6 py-12 lg:py-0">

            {/* Glass-morphism card */}
            <div className="w-full max-w-[380px]">

              {/* Mobile logo */}
              <div className="lg:hidden mb-10">
                <AfvLogo className="h-9 w-auto" variant="dark" />
              </div>

              {/* Card */}
              <div style={{
                background: 'rgba(255,255,255,0.97)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
              }}>
                {/* Red top stripe */}
                <div className="h-1" style={{ background: '#de473c' }} />

                <div className="p-8 lg:p-10">
                  <h2 className="font-black uppercase text-xl mb-1 tracking-wide"
                    style={{ color: '#0F273C', letterSpacing: '1px' }}>
                    Accedi
                  </h2>
                  <p className="text-sm font-light mb-8" style={{ color: '#888' }}>
                    Portale clienti B2B AFV Beltrame
                  </p>

                  <form action={formAction} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[1.5px] mb-2"
                        style={{ color: '#666' }}>
                        Email aziendale
                      </label>
                      <input
                        type="email" name="email" required
                        defaultValue="mario.rossi@edilrossi.it"
                        className="w-full px-4 py-3 text-sm bg-white transition-all"
                        style={{ border: '1px solid #e0e0e5', color: '#000', borderRadius: 0 }}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[1.5px] mb-2"
                        style={{ color: '#666' }}>
                        Password
                      </label>
                      <input
                        type="password" name="password" required
                        defaultValue="Beltrame2024!"
                        className="w-full px-4 py-3 text-sm bg-white transition-all"
                        style={{ border: '1px solid #e0e0e5', color: '#000', borderRadius: 0 }}
                      />
                    </div>

                    {state?.error && (
                      <div className="text-sm px-4 py-3 text-white font-medium"
                        style={{ background: '#de473c' }}>
                        {state.error}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 text-[12px] cursor-pointer"
                        style={{ color: '#888' }}>
                        <input type="checkbox" />
                        Ricordami
                      </label>
                      <a href="#" className="text-[12px] font-medium hover:underline"
                        style={{ color: '#de473c' }}>
                        Password dimenticata?
                      </a>
                    </div>

                    <button
                      type="submit" disabled={pending}
                      className="w-full py-3.5 text-white text-[12px] font-bold uppercase tracking-[2px] transition-opacity disabled:opacity-60 hover:opacity-90 mt-1"
                      style={{ background: '#de473c', borderRadius: 0 }}>
                      {pending ? 'Accesso in corso…' : 'Accedi al portale'}
                    </button>
                  </form>

                  <p className="text-center text-[11px] mt-6 font-light" style={{ color: '#bbb' }}>
                    Non hai un accesso?{' '}
                    <a href="#" className="font-medium" style={{ color: '#0F273C' }}>
                      Contatta il tuo agente
                    </a>
                  </p>
                </div>
              </div>

              <p className="text-center text-[11px] mt-4 font-light"
                style={{ color: 'rgba(255,255,255,0.2)' }}>
                Demo: qualsiasi email + password per entrare
              </p>
            </div>
          </div>
        </div>

        {/* ── Scroll hint ──────────────────────────────────────────── */}
        <div className="relative flex justify-center pb-8 pt-4">
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[10px] uppercase tracking-[3px] font-light"
              style={{ color: 'rgba(255,255,255,0.2)' }}>Scopri il gruppo</span>
            <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
              <rect x="1" y="1" width="12" height="20" rx="6" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" />
              <rect x="6" y="4" width="2" height="5" rx="1" fill="rgba(255,255,255,0.3)">
                <animate attributeName="y" values="4;9;4" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0.1;0.5" dur="1.8s" repeatCount="indefinite" />
              </rect>
            </svg>
          </div>
        </div>
      </div>

      {/* ── I nostri numeri + Banner cards ───────────────────────────── */}
      <NumbersBanner />
      <BannerCards />
    </div>
  )
}
