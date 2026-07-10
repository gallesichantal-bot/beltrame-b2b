import { getSession } from '@/lib/auth'
import { ORDERS, TICKETS } from '@/lib/mock-data'
import Link from 'next/link'
import { Package, FileText, Zap, ArrowRight, FileSpreadsheet, MapPin } from 'lucide-react'
import {
  KpiCards, VolumeChart, SpendChart,
  ProductMixChart, OrderStatusChart, TopProductsTable,
} from '@/components/DashboardCharts'

const STATUS_BADGE: Record<string, { cls: string; dot: string }> = {
  'Consegnato':    { cls: 'bg-green-50 text-green-700',  dot: '#16a34a' },
  'In transito':   { cls: 'bg-blue-50 text-blue-700',    dot: '#2563eb' },
  'In lavorazione':{ cls: 'bg-yellow-50 text-yellow-700',dot: '#ca8a04' },
  'Aperto':        { cls: 'bg-red-50 text-red-700',       dot: '#de473c' },
  'In gestione':   { cls: 'bg-blue-50 text-blue-700',    dot: '#2563eb' },
  'Chiuso':        { cls: 'bg-gray-100 text-gray-500',   dot: '#9ca3af' },
}

export default async function DashboardPage() {
  const user = await getSession()
  const openTickets = TICKETS.filter(t => t.status !== 'Chiuso')

  return (
    <div>
      {/* ── Hero — fedele a gruppobeltrame.com ──────────────────────── */}
      <div className="w-full relative overflow-hidden" style={{ background: '#0F273C' }}>
        {/* Diagonal texture sottile */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(-45deg,#fff 0px,#fff 1px,transparent 1px,transparent 24px)' }} />
        {/* Red glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[300px] opacity-[0.06]"
          style={{ background: 'radial-gradient(ellipse at top right,#de473c,transparent 70%)' }} />

        <div className="max-w-screen-xl mx-auto px-6 py-12 relative">
          <div className="flex items-start justify-between gap-8">
            {/* Left: welcome text */}
            <div className="flex-1">
              {/* Label rossa sopra il titolo — pattern del sito */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-[3px]" style={{ background: '#de473c' }} />
                <span className="text-[11px] font-bold uppercase tracking-[2px]"
                  style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {new Date().toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })}
                </span>
              </div>
              <h1 className="text-white font-black text-[36px] leading-tight uppercase mb-2"
                style={{ letterSpacing: '-0.5px' }}>
                Benvenuto,{' '}
                <span style={{ color: '#de473c' }}>{user!.name.split(' ')[0]}</span>
              </h1>
              <p className="text-[15px] font-light" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {user!.company} &nbsp;·&nbsp; Codice cliente{' '}
                <span className="font-medium text-white/60">{user!.id}</span>
              </p>
            </div>

            {/* Right: agente + CTA */}
            <div className="hidden lg:flex items-center gap-6 shrink-0">
              {/* Agente */}
              <div className="text-right">
                <p className="text-[11px] uppercase tracking-[1.5px] mb-1"
                  style={{ color: 'rgba(255,255,255,0.3)' }}>Il tuo agente</p>
                <p className="text-white font-semibold text-sm">{user!.accountManager}</p>
                <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  luca.bianchi@afvbeltrame.com
                </p>
              </div>
              <div className="w-10 h-10 flex items-center justify-center text-sm font-black text-white"
                style={{ background: '#de473c' }}>LB</div>

              <div className="w-px h-12 bg-white/10" />

              {/* CTA buttons — stile btn-outline/btn-primary del tema */}
              <div className="flex gap-3">
                <Link href="/quick-order"
                  className="flex items-center gap-2 px-5 py-2.5 text-[12px] font-bold uppercase tracking-[1.5px] text-white transition-all hover:bg-white hover:text-[#0F273C]"
                  style={{ border: '1px solid rgba(255,255,255,0.25)' }}>
                  <Zap size={13} /> Quick Order
                </Link>
                <Link href="/quote"
                  className="flex items-center gap-2 px-5 py-2.5 text-[12px] font-bold uppercase tracking-[1.5px] text-white transition-opacity hover:opacity-85"
                  style={{ background: '#de473c' }}>
                  <FileText size={13} /> Preventivo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-8 space-y-6">

        {/* ── KPI row ─────────────────────────────────────────────────── */}
        <KpiCards openTickets={openTickets.length} />

        {/* ── Charts row 1: volume + spesa ────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VolumeChart />
          <SpendChart />
        </div>

        {/* ── Charts row 2: donut + donut + top products ──────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ProductMixChart />
          <OrderStatusChart />
          <TopProductsTable />
        </div>

        {/* ── Orders + Tickets row ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Ordini recenti */}
          <div className="lg:col-span-2 bg-white rounded-none shadow-sm overflow-hidden"
            style={{ border: '1px solid #e0e0e5' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#e0e0e5' }}>
              <h2 className="font-semibold text-sm" style={{ color: '#1c1c24' }}>Ordini recenti</h2>
              <Link href="/orders" className="flex items-center gap-1 text-xs font-medium hover:underline"
                style={{ color: '#de473c' }}>
                Vedi tutti <ArrowRight size={12} />
              </Link>
            </div>
            <div className="divide-y" style={{ borderColor: '#f9fafb' }}>
              {ORDERS.map(order => {
                const badge = STATUS_BADGE[order.status] ?? STATUS_BADGE['Chiuso']
                return (
                  <Link key={order.id} href={`/orders/${order.id}`}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/70 transition-colors">
                    {/* icon */}
                    <div className="w-9 h-9 rounded-sm flex items-center justify-center shrink-0"
                      style={{ background: '#f3f3f5' }}>
                      <Package size={15} style={{ color: '#1c1c24' }} />
                    </div>
                    {/* info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold" style={{ color: '#1c1c24' }}>{order.id}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${badge.cls}`}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: badge.dot }} />
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5 text-xs" style={{ color: '#9ca3af' }}>
                        <span>{order.date}</span>
                        <span>·</span>
                        <span>{order.items.length} prodotti</span>
                        <span>·</span>
                        <span className="flex items-center gap-0.5">
                          <MapPin size={10} />
                          {order.deliveryAddress.split(',')[1]?.trim() ?? ''}
                        </span>
                      </div>
                    </div>
                    {/* total */}
                    <div className="text-sm font-bold shrink-0" style={{ color: '#1c1c24' }}>{order.total}</div>
                    <ArrowRight size={14} style={{ color: '#d1d5db' }} />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Tickets + Quick actions */}
          <div className="space-y-4">
            <div className="bg-white rounded-none shadow-sm overflow-hidden" style={{ border: '1px solid #e0e0e5' }}>
              <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: '#e0e0e5' }}>
                <h2 className="font-semibold text-sm" style={{ color: '#1c1c24' }}>Ticket aperti</h2>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-red-50 text-red-600">
                  {openTickets.length}
                </span>
              </div>
              <div className="divide-y" style={{ borderColor: '#f9fafb' }}>
                {TICKETS.filter(t => t.status !== 'Chiuso').map(ticket => {
                  const badge = STATUS_BADGE[ticket.status] ?? STATUS_BADGE['Chiuso']
                  return (
                    <div key={ticket.id} className="px-5 py-3.5">
                      <p className="text-sm font-medium leading-snug mb-1.5" style={{ color: '#1c1c24' }}>
                        {ticket.subject}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badge.cls}`}>
                          {ticket.status}
                        </span>
                        <span className="text-xs" style={{ color: '#9ca3af' }}>{ticket.date}</span>
                        <span className="ml-auto text-xs px-1.5 py-0.5 rounded font-medium"
                          style={{ background: ticket.priority === 'Alta' ? '#fef2f2' : '#f9fafb', color: ticket.priority === 'Alta' ? '#de473c' : '#9ca3af' }}>
                          {ticket.priority}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="px-5 py-3 border-t" style={{ borderColor: '#e0e0e5' }}>
                <button className="w-full text-sm font-medium py-2 rounded-sm text-white hover:opacity-90 transition-opacity"
                  style={{ background: '#1c1c24' }}>
                  + Apri nuovo ticket
                </button>
              </div>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { href: '/quick-order', label: 'Quick Order', icon: Zap, color: '#de473c' },
                { href: '/import-order', label: 'Importa Excel', icon: FileSpreadsheet, color: '#1c1c24' },
                { href: '/quote', label: 'Preventivo', icon: FileText, color: '#7c3aed' },
                { href: '/catalog', label: 'Catalogo', icon: Package, color: '#059669' },
              ].map(({ href, label, icon: Icon, color }) => (
                <Link key={href} href={href}
                  className="bg-white rounded-sm p-4 flex flex-col gap-2.5 hover:shadow-md transition-shadow"
                  style={{ border: '1px solid #e0e0e5' }}>
                  <div className="w-8 h-8 rounded-sm flex items-center justify-center text-white"
                    style={{ background: color }}>
                    <Icon size={15} />
                  </div>
                  <span className="text-xs font-semibold" style={{ color: '#1c1c24' }}>{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
