import { NextFetchEvent, NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { withAuth } from "next-auth/middleware"
import {jwtVerify} from 'jose'
import { getToken } from 'next-auth/jwt'

const secret = process.env.JWT_SECRET

export async function middleware(req: NextRequest) {

  const token = await getToken({ req })
  if (token?.email !== "temuergu@gmail.com") return NextResponse.redirect(new URL("/api/auth/signin", req.url));
}

export const config = {
  matcher: '/dashboard/:path*',
}