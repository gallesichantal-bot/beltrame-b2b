'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logoutAction } from '@/lib/actions'
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Zap,
  FileSpreadsheet,
  FileText,
  User,
  LogOut,
  ChevronRight,
} from 'lucide-react'

const NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/catalog', label: 'Catalogo prodotti', icon: Package },
  { href: '/orders', label: 'I miei ordini', icon: ClipboardList },
  { href: '/quick-order', label: 'Quick Order', icon: Zap },
  { href: '/import-order', label: 'Importa ordine', icon: FileSpreadsheet },
  { href: '/quote', label: 'Richiedi preventivo', icon: FileText },
  { href: '/account', label: 'Area personale', icon: User },
]

export default function Sidebar({ userName, company }: { userName: string; company: string }) {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen flex flex-col" style={{ background: '#1c1c24' }}>
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="text-white font-bold text-lg leading-tight">AFV Beltrame</div>
        <div className="text-white/50 text-xs mt-0.5">Portale Cliente B2B</div>
      </div>

      {/* User info */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-white"
            style={{ background: '#de473c' }}>
            {userName.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="text-white text-sm font-medium leading-tight">{userName}</div>
            <div className="text-white/50 text-xs leading-tight">{company}</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors group ${
                active
                  ? 'text-white font-medium'
                  : 'text-white/60 hover:text-white hover:bg-white/8'
              }`}
              style={active ? { background: '#de473c' } : undefined}
            >
              <Icon size={16} className="shrink-0" />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight size={14} className="opacity-60" />}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/8 text-sm transition-colors"
          >
            <LogOut size={16} />
            <span>Esci</span>
          </button>
        </form>
      </div>
    </aside>
  )
}
