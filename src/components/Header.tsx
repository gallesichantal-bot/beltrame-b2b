'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logoutAction } from '@/lib/actions'
import {
  Search, ShoppingCart, ChevronDown, User,
  Zap, FileSpreadsheet, FileText, Phone, HelpCircle, LogOut, Menu, X,
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useCart } from '@/lib/cart'
import { AfvLogo } from '@/components/Logo'

/* ── Navigation data ──────────────────────────────────────────────── */
const MAIN_NAV = [
  { href: '/dashboard', label: 'Home' },
  {
    href: '/catalog', label: 'Prodotti',
    children: [
      { href: '/catalog', label: 'Tutti i prodotti' },
      { href: '/catalog', label: 'Laminati Mercantili' },
      { href: '/catalog', label: 'Travi' },
      { href: '/catalog', label: 'Acciai per C.A.' },
      { href: '/catalog', label: 'Acciai Speciali' },
    ],
  },
  { href: '/orders',  label: 'Storico Ordini' },
  { href: '/account', label: 'Fatture' },
]

const TOP_LINKS = [
  { href: '/quick-order',  label: 'Quick Order',         icon: Zap },
  { href: '/import-order', label: 'Importa Ordine',      icon: FileSpreadsheet },
  { href: '/quote',        label: 'Richiedi Preventivo', icon: FileText },
  { href: '#',             label: 'Contatti',             icon: Phone },
  { href: '#',             label: 'Assistenza',           icon: HelpCircle },
]

/* ── Dropdown ─────────────────────────────────────────────────────── */
function NavDropdown({ item }: { item: (typeof MAIN_NAV)[1] }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const active = pathname.startsWith(item.href)

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  return (
    <div
      ref={ref}
      className="relative h-full flex items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="h-full flex items-center gap-1 px-1 text-[13px] font-medium uppercase tracking-[1px] transition-colors"
        style={{ color: active ? '#de473c' : '#000' }}
        onClick={() => setOpen(o => !o)}
      >
        {item.label}
        <ChevronDown size={12} className={`transition-transform duration-200 mt-px ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          className="absolute top-full left-0 w-56 bg-white shadow-lg z-50"
          style={{ border: '1px solid #eceef0', borderTop: '3px solid #de473c' }}
        >
          {item.children!.map(child => (
            <Link
              key={child.href + child.label}
              href={child.href}
              onClick={() => setOpen(false)}
              className="block px-5 py-3 text-[13px] font-medium text-gray-700 hover:text-[#de473c] hover:bg-[#f3f3f5] transition-colors"
              style={{ borderBottom: '1px solid #f0f0f0' }}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Logo ─────────────────────────────────────────────────────────── */
function BeltrameLogo() {
  return <AfvLogo className="h-9 w-auto" variant="light" />
}

/* ── Main component ───────────────────────────────────────────────── */
export default function Header({ userName, company }: { userName: string; company: string }) {
  const pathname = usePathname()
  const [accountOpen, setAccountOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const accountRef = useRef<HTMLDivElement>(null)
  const { count } = useCart()

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) setAccountOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  return (
    <header className="w-full sticky top-0 z-40">

      {/* ── 1. Top utility bar — dark #1c1c24 ──────────────────── */}
      <div style={{ background: '#1c1c24' }}>
        <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between h-9">
          {/* Brand tagline */}
          <span
            className="text-[11px] tracking-[1.5px] uppercase font-light hidden sm:block"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            AFV Gruppo Beltrame — Portale Clienti B2B
          </span>

          {/* Top action links */}
          <nav className="flex items-center ml-auto">
            {TOP_LINKS.map(({ href, label, icon: Icon }, i) => (
              <span key={label} className="flex items-center">
                {i > 0 && <span className="w-px h-3 mx-1" style={{ background: 'rgba(255,255,255,0.12)' }} />}
                <Link
                  href={href}
                  className="flex items-center gap-1 px-2 py-1 text-[11px] tracking-[0.5px] uppercase font-light transition-colors"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#de473c')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                >
                  <Icon size={10} />
                  {label}
                </Link>
              </span>
            ))}

            <span className="w-px h-3 mx-2" style={{ background: 'rgba(255,255,255,0.12)' }} />

            {/* Language */}
            <div className="flex items-center gap-0.5 text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
              <button className="px-1.5 py-1 uppercase tracking-wide transition-colors hover:text-white">IT</button>
              <span style={{ color: 'rgba(255,255,255,0.15)' }}>/</span>
              <button className="px-1.5 py-1 uppercase tracking-wide font-medium text-white hover:text-white/80 transition-colors">EN</button>
            </div>
          </nav>
        </div>
      </div>

      {/* ── 2. Main header — white with bottom border ──────────── */}
      <div className="bg-white" style={{ borderBottom: '1px solid #eceef0' }}>
        <div className="max-w-screen-xl mx-auto px-6 flex items-stretch h-[72px] gap-10">

          {/* Logo */}
          <Link href="/dashboard" className="flex items-center shrink-0 py-3">
            <BeltrameLogo />
          </Link>

          {/* Main navigation — uppercase, letter-spacing: 1px */}
          <nav className="hidden lg:flex items-stretch gap-0 flex-1">
            {MAIN_NAV.map(item => {
              if ('children' in item && item.children) {
                return <NavDropdown key={item.href} item={item as typeof MAIN_NAV[1]} />
              }
              const active = pathname === item.href ||
                (item.href !== '/dashboard' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative h-full flex items-center px-4 text-[13px] font-medium uppercase tracking-[1px] transition-colors group"
                  style={{ color: active ? '#de473c' : '#000' }}
                >
                  {item.label}
                  {/* Bottom hover line */}
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[3px] transition-transform duration-200 origin-left"
                    style={{
                      background: '#de473c',
                      transform: active ? 'scaleX(1)' : 'scaleX(0)',
                    }}
                  />
                  {!active && (
                    <style>{`
                      .group:hover > span { transform: scaleX(1) !important; }
                    `}</style>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-0.5 ml-auto shrink-0">
            {/* Search */}
            <button className="w-10 h-10 flex items-center justify-center transition-colors hover:bg-[#f3f3f5]">
              <Search size={18} style={{ color: '#666' }} />
            </button>

            {/* Cart with live badge */}
            <Link
              href="/cart"
              className="w-10 h-10 flex items-center justify-center transition-colors hover:bg-[#f3f3f5] relative"
            >
              <ShoppingCart size={18} style={{ color: '#666' }} />
              {count > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full text-white flex items-center justify-center font-bold px-1"
                  style={{ background: '#de473c', fontSize: '10px' }}
                >
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </Link>

            {/* Separator */}
            <div className="w-px h-6 mx-2" style={{ background: '#eceef0' }} />

            {/* Account dropdown */}
            <div ref={accountRef} className="relative">
              <button
                onClick={() => setAccountOpen(o => !o)}
                className="flex items-center gap-2 px-3 py-2 transition-colors hover:bg-[#f3f3f5]"
              >
                {/* Avatar */}
                <div
                  className="w-8 h-8 flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: '#de473c' }}
                >
                  {userName.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-semibold leading-tight" style={{ color: '#000' }}>{userName}</div>
                  <div className="text-[11px] leading-tight" style={{ color: '#999' }}>{company}</div>
                </div>
                <ChevronDown
                  size={13}
                  style={{ color: '#999' }}
                  className={`transition-transform duration-200 ${accountOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {accountOpen && (
                <div
                  className="absolute top-full right-0 w-56 bg-white shadow-xl z-50"
                  style={{ border: '1px solid #eceef0', borderTop: '3px solid #de473c' }}
                >
                  {/* User info row */}
                  <div className="px-4 py-3" style={{ borderBottom: '1px solid #f0f0f0', background: '#f9f9f9' }}>
                    <div className="text-xs font-bold uppercase tracking-wide" style={{ color: '#000' }}>{userName}</div>
                    <div className="text-[11px]" style={{ color: '#999' }}>{company}</div>
                  </div>
                  {[
                    { href: '/account', icon: User,     label: 'Area personale' },
                    { href: '/orders',  icon: FileText, label: 'I miei ordini' },
                  ].map(({ href, icon: Icon, label }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-[13px] text-gray-600 hover:text-[#de473c] hover:bg-[#f3f3f5] transition-colors"
                      style={{ borderBottom: '1px solid #f0f0f0' }}
                    >
                      <Icon size={14} /> {label}
                    </Link>
                  ))}
                  <form action={logoutAction}>
                    <button
                      type="submit"
                      className="w-full flex items-center gap-3 px-4 py-3 text-[13px] text-gray-600 hover:text-[#de473c] hover:bg-[#f3f3f5] transition-colors"
                    >
                      <LogOut size={14} /> Esci
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center"
              onClick={() => setMobileOpen(o => !o)}
            >
              {mobileOpen
                ? <X size={20} style={{ color: '#000' }} />
                : <Menu size={20} style={{ color: '#000' }} />
              }
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{ borderTop: '1px solid #eceef0' }}>
            {MAIN_NAV.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-4 text-[13px] font-medium uppercase tracking-[1px] transition-colors hover:text-[#de473c] hover:bg-[#f3f3f5]"
                style={{ color: '#000', borderBottom: '1px solid #f0f0f0' }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
