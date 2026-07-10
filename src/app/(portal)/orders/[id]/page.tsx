import { ORDERS } from '@/lib/mock-data'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, MapPin, CheckCircle2, Circle, Download } from 'lucide-react'

const STATUS_BADGE: Record<string, string> = {
  'Consegnato': 'bg-green-100 text-green-700',
  'In transito': 'bg-blue-100 text-blue-700',
  'In lavorazione': 'bg-yellow-100 text-yellow-700',
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = ORDERS.find(o => o.id === id)
  if (!order) notFound()

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-8">
      <div className="mb-6">
        <Link href="/orders" className="flex items-center gap-1.5 text-sm mb-4 hover:underline" style={{ color: '#de473c' }}>
          <ArrowLeft size={14} /> Tutti gli ordini
        </Link>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold" style={{ color: '#1c1c24' }}>{order.id}</h1>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_BADGE[order.status]}`}>
            {order.status}
          </span>
        </div>
        <p className="text-sm mt-1" style={{ color: '#6b7280' }}>Ordinato il {order.date}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order lines */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-sm shadow-sm overflow-hidden" style={{ border: '1px solid #e0e0e5' }}>
            <div className="px-6 py-4 border-b text-sm font-semibold" style={{ borderColor: '#e0e0e5', color: '#1c1c24' }}>
              Righe ordine
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e0e0e5' }}>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: '#6b7280' }}>Codice</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: '#6b7280' }}>Descrizione</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: '#6b7280' }}>Qtà</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: '#6b7280' }}>P. unitario</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: '#6b7280' }}>Totale</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: '#f3f4f6' }}>
                {order.items.map(item => (
                  <tr key={item.code}>
                    <td className="px-6 py-3.5">
                      <span className="font-mono text-xs px-2 py-1 rounded font-semibold" style={{ background: '#f3f3f5', color: '#1c1c24' }}>
                        {item.code}
                      </span>
                    </td>
                    <td className="px-6 py-3.5" style={{ color: '#1c1c24' }}>{item.description}</td>
                    <td className="px-6 py-3.5" style={{ color: '#6b7280' }}>{item.qty}</td>
                    <td className="px-6 py-3.5" style={{ color: '#6b7280' }}>{item.unitPrice}</td>
                    <td className="px-6 py-3.5 text-right font-medium" style={{ color: '#1c1c24' }}>{item.total}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ borderTop: '2px solid #e0e0e5' }}>
                  <td colSpan={4} className="px-6 py-3 text-right font-semibold text-sm" style={{ color: '#1c1c24' }}>Totale ordine</td>
                  <td className="px-6 py-3 text-right font-bold text-base" style={{ color: '#de473c' }}>{order.total}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Tracking */}
          <div className="bg-white rounded-sm shadow-sm p-6" style={{ border: '1px solid #e0e0e5' }}>
            <h2 className="font-semibold text-sm mb-5" style={{ color: '#1c1c24' }}>Tracking spedizione</h2>
            <div className="relative">
              {order.trackingSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4 mb-4 last:mb-0">
                  <div className="flex flex-col items-center">
                    {step.done
                      ? <CheckCircle2 size={20} style={{ color: '#16a34a' }} />
                      : <Circle size={20} style={{ color: '#d1d5db' }} />
                    }
                    {idx < order.trackingSteps.length - 1 && (
                      <div className="w-0.5 h-6 mt-1" style={{ background: step.done ? '#16a34a' : '#e5e7eb' }} />
                    )}
                  </div>
                  <div className="pb-1">
                    <div className="text-sm font-medium" style={{ color: step.done ? '#1c1c24' : '#9ca3af' }}>{step.label}</div>
                    <div className="text-xs" style={{ color: '#9ca3af' }}>{step.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar info */}
        <div className="space-y-4">
          <div className="bg-white rounded-sm shadow-sm p-6" style={{ border: '1px solid #e0e0e5' }}>
            <h2 className="font-semibold text-sm mb-4" style={{ color: '#1c1c24' }}>Indirizzo di consegna</h2>
            <div className="flex items-start gap-2 text-sm" style={{ color: '#6b7280' }}>
              <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: '#de473c' }} />
              {order.deliveryAddress}
            </div>
          </div>
          <div className="bg-white rounded-sm shadow-sm p-6" style={{ border: '1px solid #e0e0e5' }}>
            <h2 className="font-semibold text-sm mb-4" style={{ color: '#1c1c24' }}>Documenti</h2>
            <a
              href={`/invoices/${order.id}.pdf`}
              download={`Fattura-${order.id}.pdf`}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-sm text-sm hover:bg-gray-50 transition-colors"
              style={{ border: '1px solid #e0e0e5', display: 'flex' }}
            >
              <span className="flex items-center gap-2" style={{ color: '#1c1c24' }}>
                <Download size={14} style={{ color: '#de473c' }} />
                Fattura
              </span>
              <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: '#fef2f2', color: '#de473c' }}>PDF</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
