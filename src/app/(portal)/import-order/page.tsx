'use client'

import { useState, useCallback } from 'react'
import { Upload, FileSpreadsheet, CheckCircle, X } from 'lucide-react'

type ParsedLine = { code: string; description: string; qty: string; uom: string; valid: boolean }

const MOCK_PARSED: ParsedLine[] = [
  { code: 'IPE-200', description: 'Travi IPE 200', qty: '5000', uom: 'kg', valid: true },
  { code: 'HEA-160', description: 'Travi HEA 160', qty: '3000', uom: 'kg', valid: true },
  { code: 'XYZ-999', description: '???', qty: '500', uom: 'pz', valid: false },
  { code: 'UPN-120', description: 'Profili UPN 120', qty: '2000', uom: 'kg', valid: true },
]

export default function ImportOrderPage() {
  const [step, setStep] = useState<'upload' | 'review' | 'done'>('upload')
  const [dragging, setDragging] = useState(false)
  const [fileName, setFileName] = useState('')
  const [lines, setLines] = useState<ParsedLine[]>([])

  const handleFile = (file: File) => {
    setFileName(file.name)
    setTimeout(() => {
      setLines(MOCK_PARSED)
      setStep('review')
    }, 800)
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [])

  const removeLine = (i: number) => setLines(l => l.filter((_, idx) => idx !== i))

  if (step === 'done') {
    return (
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col items-center justify-center min-h-96">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: '#dcfce7' }}>
          <CheckCircle size={28} style={{ color: '#16a34a' }} />
        </div>
        <h2 className="text-xl font-bold mb-2" style={{ color: '#1c1c24' }}>Ordine importato!</h2>
        <p className="text-sm mb-6" style={{ color: '#6b7280' }}>
          {lines.filter(l => l.valid).length} righe importate correttamente.
        </p>
        <button onClick={() => { setStep('upload'); setLines([]); setFileName('') }}
          className="px-5 py-2.5 text-sm font-medium rounded-sm text-white" style={{ background: '#de473c' }}>
          Nuova importazione
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: '#1c1c24' }}>Importa ordine da Excel</h1>
        <p className="text-sm mt-1" style={{ color: '#6b7280' }}>
          Carica un file .xlsx o .csv con colonne: Codice, Descrizione, Quantità, U.M.
        </p>
      </div>

      {step === 'upload' && (
        <div className="max-w-lg">
          {/* Drop zone */}
          <div
            onDrop={onDrop}
            onDragOver={e => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            className="rounded-sm p-12 text-center cursor-pointer transition-all"
            style={{
              border: `2px dashed ${dragging ? '#de473c' : '#e0e0e5'}`,
              background: dragging ? '#fef2f2' : '#fafafa',
            }}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <input
              id="file-input"
              type="file"
              accept=".xlsx,.xls,.csv"
              className="hidden"
              onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
            />
            <FileSpreadsheet size={40} className="mx-auto mb-3" style={{ color: '#9ca3af' }} />
            <p className="text-sm font-medium mb-1" style={{ color: '#1c1c24' }}>
              Trascina il file qui o clicca per selezionare
            </p>
            <p className="text-xs" style={{ color: '#9ca3af' }}>Excel (.xlsx, .xls) o CSV – max 5 MB</p>
          </div>

          {/* Template download */}
          <div className="mt-4 p-4 rounded-sm flex items-center gap-3" style={{ background: '#f0f9ff', border: '1px solid #bae6fd' }}>
            <Upload size={16} style={{ color: '#0284c7' }} />
            <div className="flex-1 text-sm" style={{ color: '#0369a1' }}>
              Non hai il template? <a href="#" className="font-semibold underline">Scarica il modello Excel</a>
            </div>
          </div>
        </div>
      )}

      {step === 'review' && (
        <div>
          <div className="flex items-center gap-3 mb-4 p-4 rounded-sm" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
            <CheckCircle size={16} style={{ color: '#16a34a' }} />
            <span className="text-sm" style={{ color: '#15803d' }}>
              File <strong>{fileName}</strong> caricato – {lines.length} righe trovate
              {lines.some(l => !l.valid) && <>, <span className="text-red-600">{lines.filter(l => !l.valid).length} con errori</span></>}
            </span>
          </div>

          <div className="bg-white rounded-sm shadow-sm overflow-hidden" style={{ border: '1px solid #e0e0e5' }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e0e0e5' }}>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: '#6b7280' }}>Codice</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: '#6b7280' }}>Descrizione</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: '#6b7280' }}>Quantità</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: '#6b7280' }}>U.M.</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: '#6b7280' }}>Stato</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: '#f3f4f6' }}>
                {lines.map((line, i) => (
                  <tr key={i} className={line.valid ? '' : 'bg-red-50'}>
                    <td className="px-6 py-3.5 font-mono text-xs font-semibold" style={{ color: '#1c1c24' }}>{line.code}</td>
                    <td className="px-6 py-3.5 text-sm" style={{ color: '#1c1c24' }}>{line.description}</td>
                    <td className="px-6 py-3.5 text-sm" style={{ color: '#6b7280' }}>{line.qty}</td>
                    <td className="px-6 py-3.5 text-sm" style={{ color: '#6b7280' }}>{line.uom}</td>
                    <td className="px-6 py-3.5 text-center">
                      {line.valid
                        ? <CheckCircle size={15} style={{ color: '#16a34a' }} />
                        : <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#fef2f2', color: '#de473c' }}>Codice non trovato</span>
                      }
                    </td>
                    <td className="px-6 py-3.5">
                      <button onClick={() => removeLine(i)} className="text-gray-300 hover:text-red-500 transition-colors">
                        <X size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <button onClick={() => { setStep('upload'); setLines([]); setFileName('') }}
              className="text-sm px-4 py-2.5 rounded-sm border hover:bg-gray-50" style={{ border: '1px solid #e0e0e5', color: '#1c1c24' }}>
              ← Carica altro file
            </button>
            <button
              onClick={() => setStep('done')}
              disabled={!lines.some(l => l.valid)}
              className="px-5 py-2.5 text-sm font-medium rounded-sm text-white disabled:opacity-40"
              style={{ background: '#de473c' }}
            >
              Importa {lines.filter(l => l.valid).length} righe valide
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
