import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // console.log(req.nextauth.token)
    // console.log(token)
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "ADMIN_ROL",
    },
  }
)

export const config = { matcher: ["/dashboarda"] }