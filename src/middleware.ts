import { NextFetchEvent, NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { withAuth } from "next-auth/middleware"
import {jwtVerify} from 'jose'
import { getToken } from 'next-auth/jwt'

const secret = process.env.JWT_SECRET

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {

  const token = await getToken({ req })
  // console.log('token',token);
  // console.log(req)
  // const jwt = req.cookies.get('myToken')
  if (token?.email !== "temuergu@gmail.com") return NextResponse.redirect(new URL("/api/auth/signin", req.url));

  // return NextResponse.next()
  // if (req.nextUrl.pathname.includes('/dashboard')) {
    
  //   if (jwt === undefined) {
  //     return NextResponse.redirect(new URL('/auth/login', req.url))
  //   }
  // } 
  // try {
    
  //   if (token?.email === 'temuergu@gmail.com') return NextResponse.next()

    
  // } catch (error) {
  //   console.log(error);
  //   return NextResponse.redirect(new URL('/api/auth/signin', req.url))
    
  // }
  
}

export const config = {
  matcher: '/dashboard/:path*',
}