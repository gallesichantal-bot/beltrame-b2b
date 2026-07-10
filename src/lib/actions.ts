'use server'

import { createSession, deleteSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export async function loginAction(_state: { error: string }, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Mock validation – any non-empty credentials work
  if (!email || !password) {
    return { error: 'Inserire email e password.' }
  }

  await createSession()
  redirect('/dashboard')
  return { error: '' }
}

export async function logoutAction() {
  await deleteSession()
  redirect('/login')
}
