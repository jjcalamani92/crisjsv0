import type { GetServerSideProps, NextPage } from 'next'
import { getToken } from 'next-auth/jwt'
import { getSession } from 'next-auth/react'
import { Main } from '../../components'
import { Login } from '../../components/login'

const LoginPage: NextPage = () => {
  return (
      <Login />
  )
}

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
  const token = await getToken({ req })
  console.log('token',token);
    // const session = await getSession({req})
    // const {p = '/'} = query
    // console.log(session);
    // if(session) {
    //   return {
    //     redirect: {
    //       destination: p.toString(),
    //       permanent: false
          
    //     }
    //   }
    // }
    return {
      props: {
        // session
      }
    }
  }
export default LoginPage
