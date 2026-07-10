import { NextRequest, NextResponse } from 'next/server'

const PUBLIC = ['/login']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = request.cookies.get('beltrame_session')

  if (PUBLIC.some(p => pathname.startsWith(p))) {
    if (session) return NextResponse.redirect(new URL('/dashboard', request.url))
    return NextResponse.next()
  }

  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
