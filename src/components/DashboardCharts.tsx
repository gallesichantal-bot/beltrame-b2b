'use client'

import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { TrendingUp, TrendingDown } from 'lucide-react'

// --- Mock time-series data ---
const MONTHLY_VOLUME = [
  { month: 'Gen', volume: 42, prev: 38 },
  { month: 'Feb', volume: 58, prev: 45 },
  { month: 'Mar', volume: 71, prev: 62 },
  { month: 'Apr', volume: 65, prev: 70 },
  { month: 'Mag', volume: 89, prev: 74 },
  { month: 'Giu', volume: 102, prev: 88 },
  { month: 'Lug', volume: 78, prev: 91 },
  { month: 'Ago', volume: 0,  prev: 55 },
  { month: 'Set', volume: 0,  prev: 82 },
  { month: 'Ott', volume: 0,  prev: 96 },
  { month: 'Nov', volume: 0,  prev: 87 },
  { month: 'Dic', volume: 0,  prev: 73 },
]

const MONTHLY_SPEND = [
  { month: 'Gen', spesa: 38600, prev: 34200 },
  { month: 'Feb', spesa: 53300, prev: 41500 },
  { month: 'Mar', spesa: 65400, prev: 57100 },
  { month: 'Apr', spesa: 59900, prev: 64400 },
  { month: 'Mag', spesa: 82000, prev: 68100 },
  { month: 'Giu', spesa: 94200, prev: 81000 },
  { month: 'Lug', spesa: 71800, prev: 83700 },
]

const PRODUCT_MIX = [
  { name: 'Travi', value: 38, color: '#0F273C' },
  { name: 'Laminati Mercantili', value: 29, color: '#de473c' },
  { name: 'Acciai per C.A.', value: 24, color: '#1c1c24' },
  { name: 'Acciai Speciali', value: 9, color: '#888' },
]

const ORDER_STATUS = [
  { name: 'Consegnato', value: 7, color: '#16a34a' },
  { name: 'In transito', value: 2, color: '#2563eb' },
  { name: 'In lavorazione', value: 1, color: '#ca8a04' },
]

const TOP_PRODUCTS = [
  { name: 'IPE 200', category: 'Travi', qty: 24500, spend: 23275 },
  { name: 'HEA 160', category: 'Travi', qty: 18000, spend: 17550 },
  { name: 'TOPAR-S 500C ø16', category: 'Acciai C.A.', qty: 15000, spend: 12600 },
  { name: 'Angolare 60×6', category: 'Laminati', qty: 12000, spend: 11100 },
  { name: 'TOPAR-S 500C ø20', category: 'Acciai C.A.', qty: 11000, spend: 9460 },
]

const fmtEur = (v: number) => `€ ${v.toLocaleString('it-IT')}`
const fmtT = (v: number) => `${v} t`

// Custom tooltip shared style
const TooltipStyle = { background: '#1c1c24', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px', padding: '8px 12px' }

function CustomTooltip({ active, payload, label, formatter }: {
  active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string;
  formatter?: (v: number, n: string) => string
}) {
  if (!active || !payload?.length) return null
  return (
    <div style={TooltipStyle}>
      <div className="font-semibold mb-1 text-white/70">{label}</div>
      {payload.map(p => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-white/60">{p.name}:</span>
          <span className="font-semibold">{formatter ? formatter(p.value, p.name) : p.value}</span>
        </div>
      ))}
    </div>
  )
}

// --- KPI trend sparkline (mini area) ---
const SPARK_DATA = [12, 18, 14, 22, 19, 27, 24, 31, 28, 35]
function Sparkline({ up }: { up: boolean }) {
  return (
    <ResponsiveContainer width={80} height={30}>
      <AreaChart data={SPARK_DATA.map((v, i) => ({ v, i }))} margin={{ top: 2, bottom: 2 }}>
        <defs>
          <linearGradient id={`sg-${up}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={up ? '#16a34a' : '#de473c'} stopOpacity={0.3} />
            <stop offset="100%" stopColor={up ? '#16a34a' : '#de473c'} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="v" stroke={up ? '#16a34a' : '#de473c'} strokeWidth={1.5}
          fill={`url(#sg-${up})`} dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

// --- Components ---
export function VolumeChart() {
  return (
    <div className="bg-white rounded-none p-6 shadow-sm" style={{ border: '1px solid #e0e0e5' }}>
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="font-semibold text-sm" style={{ color: '#1c1c24' }}>Volume acquistato mensile</h3>
          <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>Tonnellate · 2024 vs 2023</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ background: '#f0fdf4', color: '#15803d' }}>
          <TrendingUp size={11} /> +12% YTD
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={MONTHLY_VOLUME} barGap={2} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={v => v ? `${v}t` : ''} />
          <Tooltip content={<CustomTooltip formatter={(v) => `${v} t`} />} cursor={{ fill: '#f9fafb' }} />
          <Bar dataKey="prev" name="2023" fill="#e0e0e5" radius={[3, 3, 0, 0]} />
          <Bar dataKey="volume" name="2024" fill="#1c1c24" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-4 mt-3">
        {[{ color: '#1c1c24', label: '2024' }, { color: '#e0e0e5', label: '2023' }].map(l => (
          <div key={l.label} className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ background: l.color }} />
            <span className="text-xs" style={{ color: '#9ca3af' }}>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SpendChart() {
  return (
    <div className="bg-white rounded-none p-6 shadow-sm" style={{ border: '1px solid #e0e0e5' }}>
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="font-semibold text-sm" style={{ color: '#1c1c24' }}>Andamento spesa</h3>
          <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>Euro · 2024 vs 2023</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ background: '#fef2f2', color: '#b91c1c' }}>
          <TrendingDown size={11} /> −5% Lug
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={MONTHLY_SPEND} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
          <defs>
            <linearGradient id="grad24" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#de473c" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#de473c" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="grad23" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1c1c24" stopOpacity={0.08} />
              <stop offset="100%" stopColor="#1c1c24" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false}
            tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
          <Tooltip content={<CustomTooltip formatter={v => fmtEur(v)} />} />
          <Area type="monotone" dataKey="prev" name="2023" stroke="#1c1c24" strokeWidth={1.5}
            strokeDasharray="4 2" fill="url(#grad23)" dot={false} />
          <Area type="monotone" dataKey="spesa" name="2024" stroke="#de473c" strokeWidth={2}
            fill="url(#grad24)" dot={{ r: 3, fill: '#de473c' }} activeDot={{ r: 5 }} />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-4 mt-3">
        {[{ color: '#de473c', label: '2024', dash: false }, { color: '#1c1c24', label: '2023', dash: true }].map(l => (
          <div key={l.label} className="flex items-center gap-1.5">
            <svg width="18" height="8"><line x1="0" y1="4" x2="18" y2="4" stroke={l.color} strokeWidth="2" strokeDasharray={l.dash ? '4 2' : undefined} /></svg>
            <span className="text-xs" style={{ color: '#9ca3af' }}>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ProductMixChart() {
  return (
    <div className="bg-white rounded-none p-6 shadow-sm" style={{ border: '1px solid #e0e0e5' }}>
      <h3 className="font-semibold text-sm mb-1" style={{ color: '#1c1c24' }}>Mix prodotti</h3>
      <p className="text-xs mb-4" style={{ color: '#9ca3af' }}>% volume YTD per categoria</p>
      <div className="flex items-center gap-4">
        <ResponsiveContainer width={130} height={130}>
          <PieChart>
            <Pie data={PRODUCT_MIX} cx="50%" cy="50%" innerRadius={38} outerRadius={58}
              dataKey="value" strokeWidth={0}>
              {PRODUCT_MIX.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-1 space-y-2">
          {PRODUCT_MIX.map(item => (
            <div key={item.name}>
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-xs flex items-center gap-1.5" style={{ color: '#6b7280' }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  {item.name}
                </span>
                <span className="text-xs font-bold" style={{ color: '#1c1c24' }}>{item.value}%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#f3f4f6' }}>
                <div className="h-full rounded-full" style={{ width: `${item.value}%`, background: item.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function OrderStatusChart() {
  return (
    <div className="bg-white rounded-none p-6 shadow-sm" style={{ border: '1px solid #e0e0e5' }}>
      <h3 className="font-semibold text-sm mb-1" style={{ color: '#1c1c24' }}>Stato ordini</h3>
      <p className="text-xs mb-4" style={{ color: '#9ca3af' }}>Ultimi 12 mesi</p>
      <div className="flex items-center justify-center">
        <ResponsiveContainer width={130} height={130}>
          <PieChart>
            <Pie data={ORDER_STATUS} cx="50%" cy="50%" innerRadius={38} outerRadius={58}
              dataKey="value" strokeWidth={0}>
              {ORDER_STATUS.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-2 mt-2">
        {ORDER_STATUS.map(s => (
          <div key={s.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs" style={{ color: '#6b7280' }}>
              <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
              {s.name}
            </div>
            <span className="text-xs font-bold" style={{ color: '#1c1c24' }}>{s.value} ordini</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function TopProductsTable() {
  const max = Math.max(...TOP_PRODUCTS.map(p => p.qty))
  return (
    <div className="bg-white rounded-none p-6 shadow-sm" style={{ border: '1px solid #e0e0e5' }}>
      <h3 className="font-semibold text-sm mb-1" style={{ color: '#1c1c24' }}>Top 5 prodotti acquistati</h3>
      <p className="text-xs mb-5" style={{ color: '#9ca3af' }}>Per volume – anno in corso</p>
      <div className="space-y-4">
        {TOP_PRODUCTS.map((p, i) => (
          <div key={p.name}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: i === 0 ? '#de473c' : '#1c1c24', fontSize: '10px' }}>{i + 1}</span>
                <div>
                  <div className="text-sm font-medium leading-tight" style={{ color: '#1c1c24' }}>{p.name}</div>
                  <div className="text-xs" style={{ color: '#9ca3af' }}>{p.category}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold" style={{ color: '#1c1c24' }}>{p.qty.toLocaleString('it-IT')} kg</div>
                <div className="text-xs" style={{ color: '#9ca3af' }}>€ {p.spend.toLocaleString('it-IT')}</div>
              </div>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#f3f4f6' }}>
              <div className="h-full rounded-full transition-all"
                style={{ width: `${(p.qty / max) * 100}%`, background: i === 0 ? '#de473c' : '#1c1c24' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function KpiCards({ openTickets }: { openTickets: number }) {
  const kpis = [
    {
      label: 'Spesa YTD', value: '€ 465.200', sub: '+12% vs 2023',
      up: true, iconBg: '#1c1c24',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
        </svg>
      ),
    },
    {
      label: 'Volume YTD', value: '505 t', sub: '+8% vs 2023',
      up: true, iconBg: '#7c3aed',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        </svg>
      ),
    },
    {
      label: 'Ordini totali', value: '10', sub: '3 in corso',
      up: true, iconBg: '#059669',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      label: 'Ticket aperti', value: String(openTickets), sub: '1 alta priorità',
      up: false, iconBg: '#de473c',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map(kpi => (
        <div key={kpi.label} className="bg-white rounded-none p-5 shadow-sm flex flex-col gap-3"
          style={{ border: '1px solid #e0e0e5' }}>
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-none flex items-center justify-center text-white"
              style={{ background: kpi.iconBg }}>
              {kpi.icon}
            </div>
            <Sparkline up={kpi.up} />
          </div>
          <div>
            <p className="text-xs font-medium" style={{ color: '#9ca3af' }}>{kpi.label}</p>
            <p className="text-2xl font-bold mt-0.5" style={{ color: '#1c1c24' }}>{kpi.value}</p>
          </div>
          <div className={`flex items-center gap-1 text-xs font-medium ${kpi.up ? 'text-green-600' : 'text-red-500'}`}>
            {kpi.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {kpi.sub}
          </div>
        </div>
      ))}
    </div>
  )
}
