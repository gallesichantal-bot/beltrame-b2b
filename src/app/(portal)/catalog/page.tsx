'use client'

import { useState } from 'react'
import { CATALOG_PRODUCTS, CatalogProduct, StockLevel } from '@/lib/mock-data'
import { useCart } from '@/lib/cart'
import { Search, Leaf, ShoppingCart, SlidersHorizontal, X, Check } from 'lucide-react'
import Link from 'next/link'

const CATEGORIES = ['Tutti', 'Laminati Mercantili', 'Travi', 'Acciai per C.A.', 'Acciai Speciali']

const STOCK_CONFIG: Record<StockLevel, { label: string; bg: string; text: string; dot: string }> = {
  high:   { label: 'Alta disponibilità',   bg: '#f0fdf4', text: '#15803d', dot: '#16a34a' },
  medium: { label: 'Media disponibilità',  bg: '#fefce8', text: '#a16207', dot: '#ca8a04' },
  low:    { label: 'Bassa disponibilità',  bg: '#fef2f2', text: '#b91c1c', dot: '#dc2626' },
}

function AddedToast({ name }: { name: string }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-sm shadow-lg text-white text-sm font-medium animate-fade-in"
      style={{ background: '#1c1c24' }}>
      <Check size={16} style={{ color: '#4ade80' }} />
      <span><strong>{name}</strong> aggiunto al carrello</span>
    </div>
  )
}

function ProductCard({ product }: { product: CatalogProduct }) {
  const { add, items } = useCart()
  const [qty, setQty] = useState(1000)
  const [added, setAdded] = useState(false)
  const inCart = items.some(i => i.code === product.code)
  const stock = STOCK_CONFIG[product.stock]

  const handleAdd = () => {
    add({
      code: product.code,
      name: product.fullName,
      category: product.category,
      price: product.price / 1000,  // price per kg
      stock: product.stock,
      chalibria: product.chalibria,
    }, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
      style={{ border: '1px solid #e0e0e5' }}>
      {/* Steel visual */}
      <div className="relative h-44 flex items-center justify-center overflow-hidden"
        style={{ background: product.gradient }}>
        {product.chalibria && (
          <div className="absolute top-3 left-3 flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full"
            style={{ background: 'rgba(5,150,105,0.9)', color: '#fff' }}>
            <Leaf size={10} /> Chalibria
          </div>
        )}
        {inCart && (
          <div className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: '#de473c' }}>
            <ShoppingCart size={12} className="text-white" />
          </div>
        )}
        {/* Code badge */}
        <div className="absolute bottom-3 left-3 font-mono text-xs font-bold px-2 py-1 rounded"
          style={{ background: 'rgba(0,0,0,0.55)', color: '#fff' }}>
          {product.code}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-semibold text-sm leading-snug" style={{ color: '#1c1c24' }}>{product.fullName}</h3>
          <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>{product.norm}</p>
        </div>

        {/* Stock badge */}
        <div className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-sm w-fit"
          style={{ background: stock.bg, color: stock.text }}>
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: stock.dot }} />
          {stock.label}
        </div>

        {/* Price */}
        <div className="text-sm font-bold" style={{ color: '#1c1c24' }}>
          € {(product.price / 1000).toFixed(3)}/kg
          <span className="text-xs font-normal ml-1" style={{ color: '#9ca3af' }}>
            (€ {product.price.toLocaleString('it-IT')}/t)
          </span>
        </div>

        {/* Qty + Add */}
        <div className="mt-auto space-y-2">
          <div className="flex items-center gap-0 rounded-sm overflow-hidden" style={{ border: '1px solid #e0e0e5' }}>
            <button onClick={() => setQty(q => Math.max(100, q - 100))}
              className="px-3 py-2 text-base font-bold hover:bg-gray-50 transition-colors"
              style={{ color: '#1c1c24', borderRight: '1px solid #e0e0e5' }}>−</button>
            <div className="flex-1 text-center text-sm font-medium py-2" style={{ color: '#1c1c24' }}>
              {qty.toLocaleString('it-IT')} kg
            </div>
            <button onClick={() => setQty(q => q + 100)}
              className="px-3 py-2 text-base font-bold hover:bg-gray-50 transition-colors"
              style={{ color: '#1c1c24', borderLeft: '1px solid #e0e0e5' }}>+</button>
          </div>
          <button
            onClick={handleAdd}
            className="w-full py-2.5 text-sm font-semibold text-white rounded-sm transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
            style={{ background: added ? '#16a34a' : '#1c1c24' }}
          >
            {added ? <><Check size={14} /> Aggiunto!</> : <><ShoppingCart size={14} /> Aggiungi al carrello</>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CatalogPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Tutti')
  const [stockFilter, setStockFilter] = useState<StockLevel[]>([])
  const [chalibria, setChalibria] = useState(false)
  const [sortBy, setSortBy] = useState<'name' | 'price-asc' | 'price-desc'>('name')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { count } = useCart()

  const filtered = CATALOG_PRODUCTS
    .filter(p => category === 'Tutti' || p.category === category)
    .filter(p => !chalibria || p.chalibria)
    .filter(p => stockFilter.length === 0 || stockFilter.includes(p.stock))
    .filter(p =>
      search === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.code.toLowerCase().includes(search.toLowerCase()) ||
      p.norm.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      return a.name.localeCompare(b.name)
    })

  const toggleStock = (s: StockLevel) =>
    setStockFilter(f => f.includes(s) ? f.filter(x => x !== s) : [...f, s])

  return (
    <div>
      {/* Page header */}
      <div className="w-full py-6" style={{ background: '#fff', borderBottom: '1px solid #e0e0e5' }}>
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="text-xs text-gray-400 mb-1">Home / Catalogo</div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#1c1c24' }}>
                {filtered.length} prodotti{category !== 'Tutti' && ` — ${category}`}
              </h1>
            </div>
            {count > 0 && (
              <Link href="/cart"
                className="flex items-center gap-2 px-4 py-2.5 rounded-sm text-sm font-semibold text-white"
                style={{ background: '#de473c' }}>
                <ShoppingCart size={15} />
                Vai al carrello ({count} kg)
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-6">
        <div className="flex gap-6">
          {/* Sidebar filters */}
          {sidebarOpen && (
            <aside className="w-64 shrink-0 space-y-4">
              {/* Search */}
              <div className="bg-white rounded-sm p-4 shadow-sm" style={{ border: '1px solid #e0e0e5' }}>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9ca3af' }} />
                  <input type="text" placeholder="Cerca prodotto…" value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-sm rounded-sm outline-none"
                    style={{ border: '1px solid #e0e0e5', color: '#1c1c24' }} />
                </div>
              </div>

              {/* Categoria */}
              <div className="bg-white rounded-sm p-4 shadow-sm" style={{ border: '1px solid #e0e0e5' }}>
                <h3 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#6b7280' }}>Categoria</h3>
                <div className="space-y-1">
                  {CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => setCategory(cat)}
                      className={`w-full text-left text-sm px-2 py-1.5 rounded-sm transition-colors ${
                        category === cat ? 'font-semibold' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      style={category === cat ? { background: '#fef2f2', color: '#de473c' } : undefined}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Disponibilità */}
              <div className="bg-white rounded-sm p-4 shadow-sm" style={{ border: '1px solid #e0e0e5' }}>
                <h3 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#6b7280' }}>Disponibilità</h3>
                <div className="space-y-2">
                  {(['high', 'medium', 'low'] as StockLevel[]).map(s => {
                    const cfg = STOCK_CONFIG[s]
                    return (
                      <label key={s} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={stockFilter.includes(s)}
                          onChange={() => toggleStock(s)}
                          className="rounded" />
                        <span className="flex items-center gap-1.5 text-sm" style={{ color: '#374151' }}>
                          <span className="w-2 h-2 rounded-full" style={{ background: cfg.dot }} />
                          {cfg.label}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Chalibria */}
              <div className="bg-white rounded-sm p-4 shadow-sm" style={{ border: '1px solid #e0e0e5' }}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={chalibria} onChange={e => setChalibria(e.target.checked)} className="rounded" />
                  <span className="flex items-center gap-1.5 text-sm font-medium" style={{ color: '#059669' }}>
                    <Leaf size={14} /> Solo Chalibria Green
                  </span>
                </label>
              </div>
            </aside>
          )}

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setSidebarOpen(o => !o)}
                className="flex items-center gap-2 text-sm px-3 py-2 rounded-sm hover:bg-white transition-colors"
                style={{ border: '1px solid #e0e0e5', color: '#1c1c24' }}>
                {sidebarOpen ? <X size={14} /> : <SlidersHorizontal size={14} />}
                {sidebarOpen ? 'Nascondi filtri' : 'Mostra filtri'}
              </button>
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: '#9ca3af' }}>Ordina per</span>
                <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
                  className="text-sm px-3 py-2 rounded-sm outline-none"
                  style={{ border: '1px solid #e0e0e5', color: '#1c1c24', background: '#fff' }}>
                  <option value="name">Nome</option>
                  <option value="price-asc">Prezzo crescente</option>
                  <option value="price-desc">Prezzo decrescente</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map(p => <ProductCard key={p.code} product={p} />)}
              </div>
            ) : (
              <div className="text-center py-20" style={{ color: '#9ca3af' }}>
                <Search size={40} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">Nessun prodotto trovato</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
