'use client'

import { useState } from 'react'
import { Plus, Trash2, Send } from 'lucide-react'

type Line = { code: string; description: string; qty: string; uom: string; note: string }
const EMPTY: Line = { code: '', description: '', qty: '', uom: 'kg', note: '' }

export default function QuotePage() {
  const [lines, setLines] = useState<Line[]>([{ ...EMPTY }])
  const [submitted, setSubmitted] = useState(false)
  const [deliveryDate, setDeliveryDate] = useState('')

  const addLine = () => setLines(l => [...l, { ...EMPTY }])
  const removeLine = (i: number) => setLines(l => l.filter((_, idx) => idx !== i))
  const update = (i: number, field: keyof Line, v: string) =>
    setLines(l => l.map((line, idx) => idx === i ? { ...line, [field]: v } : line))

  if (submitted) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col items-center justify-center min-h-96">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: '#ede9fe' }}>
          <Send size={28} style={{ color: '#7c3aed' }} />
        </div>
        <h2 className="text-xl font-bold mb-2" style={{ color: '#1c1c24' }}>Richiesta inviata!</h2>
        <p className="text-sm mb-6 text-center max-w-sm" style={{ color: '#6b7280' }}>
          Il tuo agente riceverà la richiesta di preventivo e ti risponderà entro 24 ore lavorative.
        </p>
        <button onClick={() => { setLines([{ ...EMPTY }]); setSubmitted(false) }}
          className="px-5 py-2.5 text-sm font-medium rounded-sm text-white" style={{ background: '#de473c' }}>
          Nuova richiesta
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: '#1c1c24' }}>Richiesta preventivo</h1>
        <p className="text-sm mt-1" style={{ color: '#6b7280' }}>
          Crea una richiesta di offerta – il tuo agente risponderà entro 24 ore
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Lines */}
          <div className="bg-white rounded-sm shadow-sm overflow-hidden" style={{ border: '1px solid #e0e0e5' }}>
            <div className="px-6 py-4 border-b" style={{ borderColor: '#e0e0e5', background: '#fafafa' }}>
              <span className="text-sm font-semibold" style={{ color: '#1c1c24' }}>Prodotti richiesti</span>
            </div>
            <div className="divide-y" style={{ borderColor: '#f3f4f6' }}>
              {lines.map((line, i) => (
                <div key={i} className="p-4 grid grid-cols-12 gap-3 items-start">
                  <div className="col-span-3">
                    <label className="block text-xs font-medium mb-1" style={{ color: '#6b7280' }}>Codice</label>
                    <input type="text" placeholder="IPE-200" value={line.code}
                      onChange={e => update(i, 'code', e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-sm font-mono outline-none"
                      style={{ border: '1px solid #e0e0e5' }} />
                  </div>
                  <div className="col-span-4">
                    <label className="block text-xs font-medium mb-1" style={{ color: '#6b7280' }}>Descrizione</label>
                    <input type="text" placeholder="Travi IPE 200" value={line.description}
                      onChange={e => update(i, 'description', e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-sm outline-none"
                      style={{ border: '1px solid #e0e0e5' }} />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium mb-1" style={{ color: '#6b7280' }}>Quantità</label>
                    <input type="number" placeholder="0" value={line.qty}
                      onChange={e => update(i, 'qty', e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-sm outline-none"
                      style={{ border: '1px solid #e0e0e5' }} />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium mb-1" style={{ color: '#6b7280' }}>U.M.</label>
                    <select value={line.uom} onChange={e => update(i, 'uom', e.target.value)}
                      className="w-full px-2 py-2 text-sm rounded-sm outline-none"
                      style={{ border: '1px solid #e0e0e5' }}>
                      <option>kg</option><option>t</option><option>pz</option><option>m</option>
                    </select>
                  </div>
                  <div className="col-span-1 pt-5 flex justify-center">
                    {lines.length > 1 && (
                      <button onClick={() => removeLine(i)} className="text-gray-300 hover:text-red-500 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                  <div className="col-span-12">
                    <input type="text" placeholder="Note specifiche (tolleranze, certificati, ecc.)"
                      value={line.note} onChange={e => update(i, 'note', e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-sm outline-none"
                      style={{ border: '1px solid #e0e0e5', color: '#6b7280' }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t" style={{ borderColor: '#e0e0e5' }}>
              <button onClick={addLine} className="flex items-center gap-2 text-sm font-medium" style={{ color: '#1c1c24' }}>
                <Plus size={15} /> Aggiungi prodotto
              </button>
            </div>
          </div>

          {/* Message */}
          <div className="bg-white rounded-sm shadow-sm p-6" style={{ border: '1px solid #e0e0e5' }}>
            <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>Messaggio per l&apos;agente</label>
            <textarea rows={4} placeholder="Specifiche tecniche, condizioni di consegna, tempistiche richieste…"
              className="w-full px-4 py-3 text-sm rounded-sm resize-none outline-none"
              style={{ border: '1px solid #e0e0e5', color: '#1c1c24' }} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-sm shadow-sm p-6" style={{ border: '1px solid #e0e0e5' }}>
            <h2 className="text-sm font-semibold mb-4" style={{ color: '#1c1c24' }}>Dettagli richiesta</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#6b7280' }}>Data consegna richiesta</label>
                <input type="date" value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-sm outline-none"
                  style={{ border: '1px solid #e0e0e5', color: '#1c1c24' }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#6b7280' }}>Indirizzo di consegna</label>
                <select className="w-full px-3 py-2 text-sm rounded-sm outline-none"
                  style={{ border: '1px solid #e0e0e5', color: '#1c1c24' }}>
                  <option>Via Industriale 15, Segrate (MI)</option>
                  <option>+ Aggiungi nuovo indirizzo</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: '#6b7280' }}>Riferimento interno</label>
                <input type="text" placeholder="RFQ-2024-…" className="w-full px-3 py-2 text-sm rounded-sm outline-none"
                  style={{ border: '1px solid #e0e0e5', color: '#1c1c24' }} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-sm shadow-sm p-6" style={{ border: '1px solid #e0e0e5' }}>
            <div className="text-xs mb-3" style={{ color: '#6b7280' }}>Agente commerciale</div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-white"
                style={{ background: '#1c1c24' }}>LB</div>
              <div>
                <div className="text-sm font-medium" style={{ color: '#1c1c24' }}>Luca Bianchi</div>
                <div className="text-xs" style={{ color: '#9ca3af' }}>luca.bianchi@afvbeltrame.com</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSubmitted(true)}
            disabled={!lines.some(l => l.code && l.qty)}
            className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-sm text-white disabled:opacity-40 transition-opacity hover:opacity-90"
            style={{ background: '#de473c' }}
          >
            <Send size={15} />
            Invia richiesta preventivo
          </button>
        </div>
      </div>
    </div>
  )
}
