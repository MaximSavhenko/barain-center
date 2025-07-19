import { NextRequest, NextResponse } from 'next/server'
import { EnumTokens } from './services/auth-token.service'

export async function middleware(request: NextRequest) {
  const { url, cookies } = request
  const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
  const isAuth = url.includes('/auth')

  if (isAuth && refreshToken) {
    return NextResponse.redirect(new URL('/dashboard', url))
  }
  if (isAuth) return NextResponse.next()
  if (!refreshToken) {
    return NextResponse.redirect(new URL('/auth', url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth', '/auth/:path*'],
}
