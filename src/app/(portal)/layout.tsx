import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import Header from '@/components/Header'
import { CartProvider } from '@/lib/cart'

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const user = await getSession()
  if (!user) redirect('/login')

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col" style={{ background: '#f3f3f5' }}>
        <Header userName={user.name} company={user.company} />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </CartProvider>
  )
}
