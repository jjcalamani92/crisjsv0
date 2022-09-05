import type { GetServerSideProps, NextPage } from 'next'
import { LayoutDashboard } from '../../layouts'
import { getSession, useSession } from 'next-auth/react';
import { getCsrfToken } from "next-auth/react"
import jwt from 'next-auth/jwt';
const Index: NextPage = () => {
  const {data: session} = useSession()
  console.log(session);
  
  return (
    <LayoutDashboard>
      <h1>products</h1>
    </LayoutDashboard>
  )
}
export async function getServerSideProps (ctx: any) {
  const {req} = ctx
  // console.log(ctx.req);
  // const csrfToken = await getCsrfToken(ctx.req)
  // console.log(csrfToken)
  // const session = await getSession()
  // console.log("session",session);
  // const secret = process.env.JWT_SECRET
  // const token = await jwt.getToken({ x secret })
  // console.log("JSON Web Token", token)
  
  return {
    props: {}, // will be passed to the page component as props
  }
}
export default Index
