'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart'
import Link from 'next/link'
import { CheckCircle2, ArrowLeft, Truck, CreditCard, FileText } from 'lucide-react'

type Step = 'delivery' | 'payment' | 'confirm'

const STEPS: { key: Step; label: string; icon: React.ReactNode }[] = [
  { key: 'delivery', label: 'Consegna', icon: <Truck size={16} /> },
  { key: 'payment', label: 'Pagamento', icon: <CreditCard size={16} /> },
  { key: 'confirm', label: 'Conferma', icon: <FileText size={16} /> },
]

export default function CheckoutPage() {
  const { items, total, clear } = useCart()
  const [step, setStep] = useState<Step>('delivery')
  const [placed, setPlaced] = useState(false)
  const [orderId] = useState(`ORD-2024-${String(Math.floor(Math.random() * 900) + 100).padStart(5, '0')}`)

  const [delivery, setDelivery] = useState({
    address: 'Via Industriale 15, 20090 Segrate (MI)',
    date: '',
    note: '',
    incoterm: 'DAP',
  })
  const [payment] = useState({ method: 'bonifico', ref: 'PO-2024-0042' })

  const vat = total * 0.22
  const totalWithVat = total + vat

  if (placed) {
    return (
      <div className="max-w-lg mx-auto px-6 py-20 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
          style={{ background: '#dcfce7' }}>
          <CheckCircle2 size={40} style={{ color: '#16a34a' }} />
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#1c1c24' }}>Ordine confermato!</h1>
        <p className="text-base font-semibold mb-1" style={{ color: '#de473c' }}>{orderId}</p>
        <p className="text-sm mb-6" style={{ color: '#6b7280' }}>
          Riceverai una conferma via email. Il tuo agente commerciale ti contatterà per la pianificazione della consegna.
        </p>
        <div className="w-full bg-white rounded-sm p-5 text-left mb-6" style={{ border: '1px solid #e0e0e5' }}>
          <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#9ca3af' }}>Riepilogo</div>
          <div className="flex justify-between text-sm mb-1">
            <span style={{ color: '#6b7280' }}>Totale (IVA incl.)</span>
            <span className="font-bold" style={{ color: '#1c1c24' }}>
              € {totalWithVat.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span style={{ color: '#6b7280' }}>Consegna</span>
            <span style={{ color: '#1c1c24' }}>{delivery.address}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/orders"
            className="px-5 py-2.5 rounded-sm text-sm font-semibold text-white"
            style={{ background: '#1c1c24' }}>
            Vedi i miei ordini
          </Link>
          <Link href="/catalog"
            className="px-5 py-2.5 rounded-sm text-sm font-medium border hover:bg-gray-50 transition-colors"
            style={{ border: '1px solid #e0e0e5', color: '#1c1c24' }}>
            Torna al catalogo
          </Link>
        </div>
      </div>
    )
  }

  const stepIdx = STEPS.findIndex(s => s.key === step)

  return (
    <div className="max-w-screen-lg mx-auto px-6 py-8">
      <div className="flex items-center gap-2 mb-8">
        <Link href="/cart" className="flex items-center gap-1 text-sm hover:underline" style={{ color: '#de473c' }}>
          <ArrowLeft size={14} /> Carrello
        </Link>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-0 mb-10">
        {STEPS.map((s, i) => (
          <div key={s.key} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                i < stepIdx ? 'text-white' : i === stepIdx ? 'text-white' : 'text-gray-400 bg-gray-100'
              }`}
                style={i <= stepIdx ? { background: i < stepIdx ? '#16a34a' : '#de473c' } : undefined}>
                {i < stepIdx ? <CheckCircle2 size={18} /> : s.icon}
              </div>
              <span className={`text-xs mt-1 font-medium ${i === stepIdx ? 'text-[#de473c]' : i < stepIdx ? 'text-green-600' : 'text-gray-400'}`}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="w-full h-0.5 mb-5 mx-2 rounded" style={{ background: i < stepIdx ? '#16a34a' : '#e5e7eb' }} />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          {step === 'delivery' && (
            <div className="bg-white rounded-sm shadow-sm p-6" style={{ border: '1px solid #e0e0e5' }}>
              <h2 className="font-semibold text-base mb-5 flex items-center gap-2" style={{ color: '#1c1c24' }}>
                <Truck size={16} style={{ color: '#de473c' }} /> Dati di consegna
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#374151' }}>Indirizzo di consegna</label>
                  <select className="w-full px-3 py-2.5 rounded-sm text-sm outline-none"
                    style={{ border: '1px solid #e0e0e5', color: '#1c1c24' }}
                    value={delivery.address} onChange={e => setDelivery(d => ({ ...d, address: e.target.value }))}>
                    <option>Via Industriale 15, 20090 Segrate (MI)</option>
                    <option>Via Roma 42, 20121 Milano (MI)</option>
                    <option value="altro">+ Inserisci nuovo indirizzo</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#374151' }}>Data consegna richiesta</label>
                    <input type="date" className="w-full px-3 py-2.5 rounded-sm text-sm outline-none"
                      style={{ border: '1px solid #e0e0e5', color: '#1c1c24' }}
                      value={delivery.date} onChange={e => setDelivery(d => ({ ...d, date: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#374151' }}>Incoterm</label>
                    <select className="w-full px-3 py-2.5 rounded-sm text-sm outline-none"
                      style={{ border: '1px solid #e0e0e5', color: '#1c1c24' }}
                      value={delivery.incoterm} onChange={e => setDelivery(d => ({ ...d, incoterm: e.target.value }))}>
                      <option value="DAP">DAP – Delivered At Place</option>
                      <option value="EXW">EXW – Ex Works</option>
                      <option value="FCA">FCA – Free Carrier</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#374151' }}>Note di consegna</label>
                  <textarea rows={3} placeholder="Orari di ricevimento, istruzioni scarico, ecc."
                    className="w-full px-3 py-2.5 rounded-sm text-sm resize-none outline-none"
                    style={{ border: '1px solid #e0e0e5', color: '#1c1c24' }}
                    value={delivery.note} onChange={e => setDelivery(d => ({ ...d, note: e.target.value }))} />
                </div>
              </div>
              <button onClick={() => setStep('payment')}
                className="mt-6 w-full py-3 rounded-sm text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                style={{ background: '#de473c' }}>
                Continua al pagamento →
              </button>
            </div>
          )}

          {step === 'payment' && (
            <div className="bg-white rounded-sm shadow-sm p-6" style={{ border: '1px solid #e0e0e5' }}>
              <h2 className="font-semibold text-base mb-5 flex items-center gap-2" style={{ color: '#1c1c24' }}>
                <CreditCard size={16} style={{ color: '#de473c' }} /> Informazioni di pagamento
              </h2>
              <div className="space-y-4">
                <div className="p-4 rounded-sm" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                  <div className="flex items-center gap-2 text-sm font-medium" style={{ color: '#15803d' }}>
                    <CheckCircle2 size={15} />
                    Termini contratto: Bonifico bancario 60 gg d.f.f.m.
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#374151' }}>Riferimento ordine cliente (PO)</label>
                  <input type="text" placeholder="PO-2024-0042" defaultValue={payment.ref}
                    className="w-full px-3 py-2.5 rounded-sm text-sm outline-none"
                    style={{ border: '1px solid #e0e0e5', color: '#1c1c24' }} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: '#374151' }}>Email per ricevuta</label>
                  <input type="email" defaultValue="mario.rossi@edilrossi.it"
                    className="w-full px-3 py-2.5 rounded-sm text-sm outline-none"
                    style={{ border: '1px solid #e0e0e5', color: '#1c1c24' }} />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep('delivery')}
                  className="px-5 py-3 rounded-sm text-sm font-medium border hover:bg-gray-50 transition-colors"
                  style={{ border: '1px solid #e0e0e5', color: '#1c1c24' }}>
                  ← Indietro
                </button>
                <button onClick={() => setStep('confirm')}
                  className="flex-1 py-3 rounded-sm text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                  style={{ background: '#de473c' }}>
                  Rivedi ordine →
                </button>
              </div>
            </div>
          )}

          {step === 'confirm' && (
            <div className="bg-white rounded-sm shadow-sm p-6" style={{ border: '1px solid #e0e0e5' }}>
              <h2 className="font-semibold text-base mb-5 flex items-center gap-2" style={{ color: '#1c1c24' }}>
                <FileText size={16} style={{ color: '#de473c' }} /> Conferma ordine
              </h2>
              <div className="space-y-4 mb-6">
                {/* Delivery summary */}
                <div className="p-4 rounded-sm text-sm" style={{ background: '#f9fafb', border: '1px solid #e0e0e5' }}>
                  <div className="font-medium mb-2 flex items-center gap-2" style={{ color: '#1c1c24' }}>
                    <Truck size={14} /> Consegna
                  </div>
                  <div style={{ color: '#6b7280' }}>{delivery.address}</div>
                  {delivery.date && <div style={{ color: '#6b7280' }}>Entro il {delivery.date}</div>}
                  <div style={{ color: '#6b7280' }}>Incoterm: {delivery.incoterm}</div>
                </div>
                {/* Items */}
                <div className="divide-y rounded-sm overflow-hidden" style={{ border: '1px solid #e0e0e5' }}>
                  {items.map(item => (
                    <div key={item.code} className="flex justify-between items-center px-4 py-3 text-sm">
                      <div>
                        <div className="font-medium" style={{ color: '#1c1c24' }}>{item.name.split('–')[0].trim()}</div>
                        <div className="text-xs" style={{ color: '#9ca3af' }}>{item.qty.toLocaleString('it-IT')} kg × € {item.price.toFixed(3)}</div>
                      </div>
                      <span className="font-semibold" style={{ color: '#1c1c24' }}>
                        € {(item.price * item.qty).toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep('payment')}
                  className="px-5 py-3 rounded-sm text-sm font-medium border hover:bg-gray-50 transition-colors"
                  style={{ border: '1px solid #e0e0e5', color: '#1c1c24' }}>
                  ← Indietro
                </button>
                <button
                  onClick={() => { clear(); setPlaced(true) }}
                  className="flex-1 py-3 rounded-sm text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                  style={{ background: '#de473c' }}>
                  Conferma e invia ordine
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        <div className="bg-white rounded-sm shadow-sm p-5 h-fit sticky top-24" style={{ border: '1px solid #e0e0e5' }}>
          <h3 className="font-semibold text-sm mb-4" style={{ color: '#1c1c24' }}>Il tuo ordine</h3>
          <div className="space-y-2 pb-3 mb-3" style={{ borderBottom: '1px solid #e0e0e5' }}>
            {items.map(item => (
              <div key={item.code} className="flex justify-between text-xs">
                <span className="truncate pr-2" style={{ color: '#6b7280' }}>{item.name.split('–')[0].trim()}</span>
                <span className="shrink-0 font-medium" style={{ color: '#1c1c24' }}>
                  € {(item.price * item.qty).toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span style={{ color: '#6b7280' }}>Subtotale</span>
              <span style={{ color: '#1c1c24' }}>€ {total.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#6b7280' }}>IVA 22%</span>
              <span style={{ color: '#1c1c24' }}>€ {vat.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between pt-2 font-bold text-base" style={{ borderTop: '1px solid #e0e0e5' }}>
              <span style={{ color: '#1c1c24' }}>Totale</span>
              <span style={{ color: '#de473c' }}>€ {totalWithVat.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
