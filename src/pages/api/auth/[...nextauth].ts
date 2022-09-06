import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import GithubProvider from "next-auth/providers/github"
import TwitterProvider from "next-auth/providers/twitter"
import Auth0Provider from "next-auth/providers/auth0"
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      // token.role = "ADMIN_ROL"
      return token
    },
  },
}

export default NextAuth(authOptions)

// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// // import { NextRequest, NextResponse } from "next/server";
// import { dbUsers } from "../../../db";
// import type { NextAuthOptions } from "next-auth"
// import { serialize } from "cookie";
// import jwt from "jsonwebtoken"
// import { NextApiRequest, NextApiResponse } from "next";
// import NextAuth from "next-auth";

// const nextAuthOptions = (req: NextApiRequest, res: any) => {
//   return {
//     providers: [
//       GoogleProvider({
//         clientId: process.env.GOOGLE_CLIENT_ID!,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       }),
//       Credentials({
//       name: "Custom Login",
//       credentials: {
//         email: { label: "email", type: "email", placeholder: " hola@hola.com" },
//         password: {
//           label: "password",
//           type: "password",
//           placeholder: " 123fgt",
//         },
//       },
//       async authorize(credentials) {
//         // console.log(credentials)
//         const user = await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password)
//         console.log(user);
//         const token = jwt.sign(
//           {
//             exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
//             email: user?.email,
//             username: user?.username,
//             role: user?.role ,
//             image: user?.image
//           },
//           "secret"
//         )
        
//         const serialised = serialize("token", token, {
//           httpOnly: true,
//           secure: process.env.NODE_ENV !== "development",
//           sameSite: "strict",
//           maxAge: 60 * 60 * 24 * 30,
//           path: "/",
//         })
//         res.setHeader("Set-Cookie", serialised);
//         return user
//       }
//     }),
//     ],
//     // pages:{
//     //   signIn: '/auth/login',
//     // },
//     callbacks: {
//           async jwt({token, account, user}:any) {
//             // console.log('jwt', {token, account, user});
            
//             if (account) {
//               token.accessToken = account.access_token;
//               switch( account.type ){
//                 case 'oauth':
//                   const data = await dbUsers.oAUthToDbUser(user?.email || '', user?.name || '', user?.image|| '')
//                   const tkn = jwt.sign(
//                     {
//                       exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
//                       email: data?.email,
//                       username: data?.username,
//                       role: data?.role ,
//                       image: data?.image
//                     },
//                     "secret"
//                   )
                  
//                   const serialised = serialize("token", tkn, {
//                     httpOnly: true,
//                     secure: process.env.NODE_ENV !== "development",
//                     sameSite: "strict",
//                     maxAge: 60 * 60 * 24 * 30,
//                     path: "/",
//                   })
//                   res.setHeader("Set-Cookie", serialised);
                  
//                   token.user = data
      
//                 break
//                 case 'credentials':
//                   token.user = user;
//                   break
//               }
//             }

//             return token
//           },
//           async session({session, token, user}:any) {
//             // console.log('session', {token, session, user});
//             session.accessToken = token.accessToken;
//             session.user = token.user as any
//             return  session
//           }
          
//         }
//   }
// };

// // eslint-disable-next-line import/no-anonymous-default-export
// export default (req: NextApiRequest, res: NextApiResponse) => {
  
//   return NextAuth(req, res, nextAuthOptions(req, res) );
// };


// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//               clientId: process.env.GOOGLE_CLIENT_ID!,
//               clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//             }),
//   ],
//   jwt: {
//     async encode({ secret, token }) {
//       return jwt.sign(token, secret)
//     },
//     async decode({ secret, token }) {
//       return jwt.verify(token, secret)
//     },
//   },
// }
// export default NextAuth(authOptions)
// export default NextAuth({
//   // Configure one or more authentication providers
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!
//     }),
//     Credentials({
//       name: "Custom Login",
//       credentials: {
//         email: { label: "email", type: "email", placeholder: " hola@hola.com" },
//         password: {
//           label: "password",
//           type: "password",
//           placeholder: " 123fgt",
//         },
//       },
//       async authorize(credentials) {
//         console.log(credentials)
//         // return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password)
//         return null
//       }
//     }),
//     // ...add more providers here
//   ],
//   // pages:{
//   //   signIn: '/auth/login',
//   //   newUser: '/auth/register'
//   // },
//   session: {

//     maxAge: 2592000,
//     strategy: 'jwt',
//     updateAge: 86400,
//   },
//   //Callbacks
//   callbacks: {
//     async jwt({token, account, user}) {
//       if (account) {
//         token.accessToken = account.access_token;
//         switch( account.type ){
//           case 'oauth':
//             token.user = await dbUsers.oAUthToDbUser(user?.email || '', user?.name || '', user?.image|| '')

//           break
//           case 'credentials':
//             token.user = user;
//             break
//         }
//       }
//       console.log(token);

//       return token
//     },
//     async session({session, token, user}) {
//       session.accessToken = token.accessToken;
//       session.user = token.user as any
//       return  session
//     }
//   }
// });
