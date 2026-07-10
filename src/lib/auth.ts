import { cookies } from 'next/headers'

export const MOCK_USER = {
  id: 'B2B-0042',
  name: 'Mario Rossi',
  company: 'Edil Rossi S.p.A.',
  email: 'mario.rossi@edilrossi.it',
  phone: '+39 02 1234567',
  vatNumber: 'IT01234567890',
  address: 'Via Roma 42, 20121 Milano (MI)',
  accountManager: 'Luca Bianchi',
  creditLimit: '€ 250.000',
  paymentTerms: '60 gg d.f.f.m.',
}

export async function getSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get('beltrame_session')
  return session ? MOCK_USER : null
}

export async function createSession() {
  const cookieStore = await cookies()
  cookieStore.set('beltrame_session', 'active', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 8,
    path: '/',
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('beltrame_session')
}
