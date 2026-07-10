import { ORDERS } from '@/lib/mock-data'
import Link from 'next/link'
import { Package, ArrowRight } from 'lucide-react'

const STATUS_BADGE: Record<string, string> = {
  'Consegnato': 'bg-green-100 text-green-700',
  'In transito': 'bg-blue-100 text-blue-700',
  'In lavorazione': 'bg-yellow-100 text-yellow-700',
}

export default function OrdersPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: '#1c1c24' }}>I miei ordini</h1>
        <p className="text-sm mt-1" style={{ color: '#6b7280' }}>Storico ordini e stato consegne</p>
      </div>

      <div className="bg-white rounded-sm shadow-sm overflow-hidden" style={{ border: '1px solid #e0e0e5' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e0e0e5' }}>
              <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: '#6b7280' }}>N° Ordine</th>
              <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: '#6b7280' }}>Data</th>
              <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: '#6b7280' }}>Articoli</th>
              <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: '#6b7280' }}>Stato</th>
              <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: '#6b7280' }}>Totale</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: '#f3f4f6' }}>
            {ORDERS.map(order => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-sm flex items-center justify-center" style={{ background: '#f3f3f5' }}>
                      <Package size={14} style={{ color: '#1c1c24' }} />
                    </div>
                    <span className="font-medium" style={{ color: '#1c1c24' }}>{order.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4" style={{ color: '#6b7280' }}>{order.date}</td>
                <td className="px-6 py-4" style={{ color: '#6b7280' }}>{order.items.length} prodotti</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_BADGE[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold" style={{ color: '#1c1c24' }}>{order.total}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/orders/${order.id}`}
                    className="flex items-center gap-1 text-xs font-medium hover:underline"
                    style={{ color: '#de473c' }}
                  >
                    Dettaglio <ArrowRight size={12} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
