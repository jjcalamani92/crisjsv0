import { NextResponse, NextRequest } from 'next/server';
import { withAuth } from "next-auth/middleware"
import { jwtVerify } from "jose";
export async function middleware(req:NextRequest) {
  const jwt = req.cookies.get('token')
  const jwt2 = req.cookies.get('next-auth.session-token')
  const jwt3 = req.cookies.get('__Secure-next-auth.session-token')
  // console.log('jwt2', jwt2);
  
  // if (!jwt2 || !jwt3 ) return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  // console.log('token', req.cookies.get('token'))
  // console.log('next-auth.session-token', req.cookies.get('next-auth.session-token'))
  // const { payload } = await jwtVerify( jwt as string,
  //   new TextEncoder().encode("secret")
  // );
  // console.log( payload.role );
  try {
    const { payload } = await jwtVerify( jwt?.toString()!,
      new TextEncoder().encode("secret")
    );

    if (payload.role === 'ADMIN_ROL') {
      // return NextResponse.redirect(new URL("/api/auth/signin", req.url));
      return NextResponse.next();
    }

    // if (payload.role === 'ADMIN_ROL') 
    
  } catch (error) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }
}
// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   async function middleware(req) {
//     const jwt = req.cookies.get('token')
//     const jwt2 = req.cookies.get('next-auth.session-token')
//     // if (!jwt2) return NextResponse.redirect(new URL("/api/auth/signin", req.url));
//     console.log('token', req.cookies.get('token'))
//     console.log('next-auth.session-token', req.cookies.get('next-auth.session-token'))
//     const { payload } = await jwtVerify(
//       jwt!,
//       new TextEncoder().encode("secret")
//     );
//     console.log({ payload });
//     // console.log(token)
//   },
  // {
  //   callbacks: {
  //     authorized: ({ token }) => token?.role !== "ADMIN_ROL",
  //   },
  // }
// )

export const config = { matcher: ["/dashboard/:path*"] }