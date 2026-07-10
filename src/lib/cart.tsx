'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type CartItem = {
  code: string
  name: string
  category: string
  price: number
  qty: number
  stock: 'high' | 'medium' | 'low'
  chalibria: boolean
}

type CartCtx = {
  items: CartItem[]
  add: (item: Omit<CartItem, 'qty'>, qty?: number) => void
  remove: (code: string) => void
  setQty: (code: string, qty: number) => void
  clear: () => void
  total: number
  count: number
}

const CartContext = createContext<CartCtx>({
  items: [], add: () => {}, remove: () => {}, setQty: () => {}, clear: () => {}, total: 0, count: 0,
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('beltrame_cart')
      if (saved) setItems(JSON.parse(saved))
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem('beltrame_cart', JSON.stringify(items))
  }, [items])

  const add = (item: Omit<CartItem, 'qty'>, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.code === item.code)
      if (existing) return prev.map(i => i.code === item.code ? { ...i, qty: i.qty + qty } : i)
      return [...prev, { ...item, qty }]
    })
  }

  const remove = (code: string) => setItems(prev => prev.filter(i => i.code !== code))

  const setQty = (code: string, qty: number) => {
    if (qty <= 0) return remove(code)
    setItems(prev => prev.map(i => i.code === code ? { ...i, qty } : i))
  }

  const clear = () => setItems([])

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  return <CartContext.Provider value={{ items, add, remove, setQty, clear, total, count }}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
