'use client'

import { useCart } from '@/lib/cart'
import Link from 'next/link'
import { Trash2, ShoppingCart, ArrowRight, ArrowLeft } from 'lucide-react'

export default function CartPage() {
  const { items, remove, setQty, total, clear } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-screen-xl mx-auto px-6 py-16 flex flex-col items-center">
        <ShoppingCart size={48} className="mb-4 opacity-20" style={{ color: '#1c1c24' }} />
        <h2 className="text-xl font-bold mb-2" style={{ color: '#1c1c24' }}>Il carrello è vuoto</h2>
        <p className="text-sm mb-6" style={{ color: '#6b7280' }}>Aggiungi prodotti dal catalogo per iniziare un ordine.</p>
        <Link href="/catalog"
          className="flex items-center gap-2 px-5 py-2.5 rounded-sm text-white text-sm font-semibold"
          style={{ background: '#de473c' }}>
          <ArrowLeft size={14} /> Vai al catalogo
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#1c1c24' }}>Carrello</h1>
          <p className="text-sm mt-0.5" style={{ color: '#6b7280' }}>{items.length} prodotti</p>
        </div>
        <button onClick={clear} className="text-xs text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1">
          <Trash2 size={13} /> Svuota carrello
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map(item => (
            <div key={item.code} className="bg-white rounded-sm p-5 shadow-sm flex gap-4"
              style={{ border: '1px solid #e0e0e5' }}>
              {/* Mini steel swatch */}
              <div className="w-14 h-14 rounded-sm shrink-0 flex items-center justify-center font-mono text-xs font-bold text-white"
                style={{ background: 'linear-gradient(135deg,#888 0%,#ccc 50%,#777 100%)' }}>
                {item.code.split('-')[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm leading-snug" style={{ color: '#1c1c24' }}>{item.name}</div>
                <div className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>{item.category}</div>
                <div className="flex items-center gap-3 mt-3">
                  {/* Qty */}
                  <div className="flex items-center gap-0 rounded-sm overflow-hidden" style={{ border: '1px solid #e0e0e5' }}>
                    <button onClick={() => setQty(item.code, item.qty - 100)}
                      className="px-2.5 py-1.5 text-sm font-bold hover:bg-gray-50 transition-colors"
                      style={{ borderRight: '1px solid #e0e0e5', color: '#1c1c24' }}>−</button>
                    <span className="px-3 text-sm font-medium" style={{ color: '#1c1c24' }}>
                      {item.qty.toLocaleString('it-IT')} kg
                    </span>
                    <button onClick={() => setQty(item.code, item.qty + 100)}
                      className="px-2.5 py-1.5 text-sm font-bold hover:bg-gray-50 transition-colors"
                      style={{ borderLeft: '1px solid #e0e0e5', color: '#1c1c24' }}>+</button>
                  </div>
                  <button onClick={() => remove(item.code)}
                    className="text-gray-300 hover:text-red-500 transition-colors ml-auto">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs" style={{ color: '#9ca3af' }}>€ {item.price.toFixed(3)}/kg</div>
                <div className="font-bold text-base mt-0.5" style={{ color: '#1c1c24' }}>
                  € {(item.price * item.qty).toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-sm shadow-sm p-6 h-fit sticky top-24" style={{ border: '1px solid #e0e0e5' }}>
          <h2 className="font-semibold mb-4" style={{ color: '#1c1c24' }}>Riepilogo ordine</h2>
          <div className="space-y-2 pb-4 mb-4" style={{ borderBottom: '1px solid #e0e0e5' }}>
            {items.map(item => (
              <div key={item.code} className="flex justify-between text-sm">
                <span className="truncate pr-2" style={{ color: '#6b7280' }}>{item.name.split('–')[0].trim()}</span>
                <span className="shrink-0 font-medium" style={{ color: '#1c1c24' }}>
                  € {(item.price * item.qty).toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium" style={{ color: '#6b7280' }}>Subtotale (IVA escl.)</span>
            <span className="font-bold text-lg" style={{ color: '#1c1c24' }}>
              € {total.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <p className="text-xs mb-5" style={{ color: '#9ca3af' }}>IVA e spese di trasporto calcolate al checkout</p>
          <Link href="/checkout"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-sm text-white text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: '#de473c' }}>
            Procedi al checkout <ArrowRight size={15} />
          </Link>
          <Link href="/catalog"
            className="w-full flex items-center justify-center gap-2 py-2.5 mt-2 rounded-sm text-sm font-medium transition-colors hover:bg-gray-50"
            style={{ border: '1px solid #e0e0e5', color: '#1c1c24' }}>
            <ArrowLeft size={14} /> Continua lo shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
