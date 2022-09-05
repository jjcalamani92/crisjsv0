import type { NextPage } from 'next'
import { Main } from '../../components'
import { Login } from '../../components/login'

const LoginPage: NextPage = () => {
  return (
    <div className='h-96 max-w-2xl mx-auto p-3 md:p-10 '>
      <Login />
    </div>
  )
}


export default LoginPage
