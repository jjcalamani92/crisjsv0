import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { Main } from '../../components'
import { Login } from '../../components/login'

const LoginPage: NextPage = () => {
  return (
    <div className=''>
      <Login />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
    const session = await getSession({req})
    const {p = '/'} = query
    console.log(session);
    if(session) {
      return {
        redirect: {
          destination: p.toString(),
          permanent: false
          
        }
      }
    }
    return {
      props: {
        session
      }
    }
  }
export default LoginPage
