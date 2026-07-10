import { getSession } from '@/lib/auth'
import { INVOICES } from '@/lib/mock-data'
import { User, Building2, CreditCard, Mail, Phone, MapPin, Download } from 'lucide-react'

export default async function AccountPage() {
  const user = await getSession()

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: '#1c1c24' }}>Area personale</h1>
        <p className="text-sm mt-1" style={{ color: '#6b7280' }}>Profilo, impostazioni e documenti</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-sm shadow-sm p-6" style={{ border: '1px solid #e0e0e5' }}>
            <div className="flex items-start gap-5 mb-6">
              <div className="w-16 h-16 rounded-none flex items-center justify-center text-2xl font-bold text-white"
                style={{ background: '#de473c' }}>
                {user!.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2 className="text-lg font-bold" style={{ color: '#1c1c24' }}>{user!.name}</h2>
                <p className="text-sm" style={{ color: '#6b7280' }}>{user!.company}</p>
                <p className="text-xs mt-1 px-2 py-0.5 rounded-full inline-block font-medium"
                  style={{ background: '#dcfce7', color: '#15803d' }}>
                  Account attivo
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <Mail size={14} />, label: 'Email', value: user!.email },
                { icon: <Phone size={14} />, label: 'Telefono', value: user!.phone },
                { icon: <Building2 size={14} />, label: 'Azienda', value: user!.company },
                { icon: <User size={14} />, label: 'Partita IVA', value: user!.vatNumber },
                { icon: <MapPin size={14} />, label: 'Indirizzo', value: user!.address },
                { icon: <User size={14} />, label: 'Codice cliente', value: user!.id },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-start gap-3 p-3 rounded-sm" style={{ background: '#f9fafb' }}>
                  <div className="mt-0.5" style={{ color: '#9ca3af' }}>{icon}</div>
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: '#9ca3af' }}>{label}</div>
                    <div className="text-sm font-medium" style={{ color: '#1c1c24' }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-end">
              <button className="px-4 py-2 text-sm font-medium rounded-sm border hover:bg-gray-50 transition-colors"
                style={{ border: '1px solid #e0e0e5', color: '#1c1c24' }}>
                Modifica profilo
              </button>
            </div>
          </div>

          {/* Invoices */}
          <div className="bg-white rounded-sm shadow-sm overflow-hidden" style={{ border: '1px solid #e0e0e5' }}>
            <div className="px-6 py-4 border-b flex items-center gap-2" style={{ borderColor: '#e0e0e5', background: '#fafafa' }}>
              <CreditCard size={16} style={{ color: '#1c1c24' }} />
              <span className="text-sm font-semibold" style={{ color: '#1c1c24' }}>Fatture</span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e0e0e5' }}>
                  {['N° Fattura', 'Ordine', 'Data', 'Importo', 'Scadenza', 'Stato', ''].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide"
                      style={{ color: '#6b7280' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: '#f3f4f6' }}>
                {INVOICES.map(inv => (
                  <tr key={inv.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3.5 font-medium" style={{ color: '#1c1c24' }}>{inv.id}</td>
                    <td className="px-6 py-3.5 text-xs" style={{ color: '#6b7280' }}>{inv.orderId}</td>
                    <td className="px-6 py-3.5 text-xs" style={{ color: '#6b7280' }}>{inv.date}</td>
                    <td className="px-6 py-3.5 font-semibold" style={{ color: '#1c1c24' }}>{inv.amount}</td>
                    <td className="px-6 py-3.5 text-xs" style={{ color: '#6b7280' }}>{inv.due}</td>
                    <td className="px-6 py-3.5">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-700">
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <button className="flex items-center gap-1 text-xs hover:opacity-80" style={{ color: '#de473c' }}>
                        <Download size={12} /> PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-sm shadow-sm p-6" style={{ border: '1px solid #e0e0e5' }}>
            <h2 className="text-sm font-semibold mb-4" style={{ color: '#1c1c24' }}>Condizioni commerciali</h2>
            <div className="space-y-3">
              {[
                { label: 'Fido creditizio', value: user!.creditLimit },
                { label: 'Termini di pagamento', value: user!.paymentTerms },
                { label: 'Agente commerciale', value: user!.accountManager },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-start">
                  <span className="text-xs" style={{ color: '#9ca3af' }}>{label}</span>
                  <span className="text-xs font-semibold text-right" style={{ color: '#1c1c24' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-sm shadow-sm p-6" style={{ border: '1px solid #e0e0e5' }}>
            <h2 className="text-sm font-semibold mb-4" style={{ color: '#1c1c24' }}>Sicurezza</h2>
            <div className="space-y-2">
              {['Cambia password', 'Gestisci accessi', 'Abilita 2FA'].map(item => (
                <button key={item} className="w-full text-left px-3 py-2.5 rounded-sm text-sm hover:bg-gray-50 transition-colors"
                  style={{ border: '1px solid #e0e0e5', color: '#1c1c24' }}>
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
