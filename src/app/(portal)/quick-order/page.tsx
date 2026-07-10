'use client'

import { useState } from 'react'
import { Plus, Trash2, ShoppingCart } from 'lucide-react'

type Line = { code: string; description: string; qty: string; uom: string }

const EMPTY_LINE: Line = { code: '', description: '', qty: '', uom: 'kg' }

export default function QuickOrderPage() {
  const [lines, setLines] = useState<Line[]>([{ ...EMPTY_LINE }])
  const [submitted, setSubmitted] = useState(false)

  const addLine = () => setLines(l => [...l, { ...EMPTY_LINE }])
  const removeLine = (i: number) => setLines(l => l.filter((_, idx) => idx !== i))
  const updateLine = (i: number, field: keyof Line, value: string) =>
    setLines(l => l.map((line, idx) => idx === i ? { ...line, [field]: value } : line))

  if (submitted) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col items-center justify-center min-h-96">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: '#dcfce7' }}>
          <ShoppingCart size={28} style={{ color: '#16a34a' }} />
        </div>
        <h2 className="text-xl font-bold mb-2" style={{ color: '#1c1c24' }}>Ordine inviato!</h2>
        <p className="text-sm mb-6" style={{ color: '#6b7280' }}>Il tuo ordine è stato ricevuto. Riceverai una conferma via email.</p>
        <button
          onClick={() => { setLines([{ ...EMPTY_LINE }]); setSubmitted(false) }}
          className="px-5 py-2.5 text-sm font-medium rounded-sm text-white"
          style={{ background: '#de473c' }}
        >
          Nuovo ordine
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: '#1c1c24' }}>Quick Order</h1>
        <p className="text-sm mt-1" style={{ color: '#6b7280' }}>Inserisci i codici prodotto e le quantità per ordinare rapidamente</p>
      </div>

      <div className="bg-white rounded-sm shadow-sm overflow-hidden" style={{ border: '1px solid #e0e0e5' }}>
        <div className="px-6 py-4 border-b" style={{ borderColor: '#e0e0e5', background: '#fafafa' }}>
          <span className="text-sm font-semibold" style={{ color: '#1c1c24' }}>Righe ordine</span>
        </div>

        {/* Header row */}
        <div className="grid grid-cols-12 gap-3 px-6 py-3 text-xs font-semibold uppercase tracking-wide border-b"
          style={{ color: '#6b7280', borderColor: '#e0e0e5', background: '#f9fafb' }}>
          <div className="col-span-3">Codice prodotto</div>
          <div className="col-span-5">Descrizione (opzionale)</div>
          <div className="col-span-2">Quantità</div>
          <div className="col-span-1">U.M.</div>
          <div className="col-span-1" />
        </div>

        <div className="divide-y" style={{ borderColor: '#f3f4f6' }}>
          {lines.map((line, i) => (
            <div key={i} className="grid grid-cols-12 gap-3 px-6 py-3 items-center">
              <div className="col-span-3">
                <input
                  type="text"
                  placeholder="es. IPE-200"
                  value={line.code}
                  onChange={e => updateLine(i, 'code', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-sm font-mono outline-none"
                  style={{ border: '1px solid #e0e0e5', color: '#1c1c24' }}
                />
              </div>
              <div className="col-span-5">
                <input
                  type="text"
                  placeholder="Travi IPE 200 – EN 10365"
                  value={line.description}
                  onChange={e => updateLine(i, 'description', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-sm outline-none"
                  style={{ border: '1px solid #e0e0e5', color: '#1c1c24' }}
                />
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  placeholder="0"
                  min="0"
                  value={line.qty}
                  onChange={e => updateLine(i, 'qty', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-sm outline-none"
                  style={{ border: '1px solid #e0e0e5', color: '#1c1c24' }}
                />
              </div>
              <div className="col-span-1">
                <select
                  value={line.uom}
                  onChange={e => updateLine(i, 'uom', e.target.value)}
                  className="w-full px-2 py-2 text-sm rounded-sm outline-none"
                  style={{ border: '1px solid #e0e0e5', color: '#1c1c24' }}
                >
                  <option>kg</option>
                  <option>t</option>
                  <option>pz</option>
                  <option>m</option>
                </select>
              </div>
              <div className="col-span-1 flex justify-center">
                {lines.length > 1 && (
                  <button onClick={() => removeLine(i)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t flex items-center gap-3" style={{ borderColor: '#e0e0e5' }}>
          <button
            onClick={addLine}
            className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity"
            style={{ color: '#1c1c24' }}
          >
            <Plus size={15} />
            Aggiungi riga
          </button>
        </div>
      </div>

      {/* Note */}
      <div className="mt-4 bg-white rounded-sm shadow-sm p-6" style={{ border: '1px solid #e0e0e5' }}>
        <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>Note ordine</label>
        <textarea
          rows={3}
          placeholder="Istruzioni di consegna, riferimenti interni, ecc."
          className="w-full px-4 py-3 text-sm rounded-sm resize-none outline-none"
          style={{ border: '1px solid #e0e0e5', color: '#1c1c24' }}
        />
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button className="px-5 py-2.5 text-sm font-medium rounded-sm border transition-colors hover:bg-gray-50"
          style={{ border: '1px solid #e0e0e5', color: '#1c1c24' }}>
          Salva bozza
        </button>
        <button
          onClick={() => setSubmitted(true)}
          disabled={!lines.some(l => l.code && l.qty)}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-sm text-white transition-opacity disabled:opacity-40"
          style={{ background: '#de473c' }}
        >
          <ShoppingCart size={15} />
          Invia ordine
        </button>
      </div>
    </div>
  )
}
