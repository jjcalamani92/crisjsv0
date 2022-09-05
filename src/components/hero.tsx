/* This example requires Tailwind CSS v2.0+ */
import Link from 'next/link'
import { FC, Fragment } from 'react'


const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

interface Props {
  title: string
}

export const Hero: FC<Props> = ({ title}) => {
  // const { h1, span, p, imageSrc, imageAlt } = contain
  return (

      <div className="px-4 py-24 mx-auto max-w-7xl">

        <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
          <h1 className="mb-6 text-5xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
            {title} <span className=" w-full text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-700 "> Devs  </span> 
          </h1>
          <p className="px-0 mb-6 text-lg text-gray-600 md:text-xl lg:px-24">
          como
          </p>
          <div className="mt-5 sm:mt-8 sm:flex justify-center">
            <div className="rounded-md shadow">
              <Link href="/blog">
                <a
                  
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  Get started
                </a>
              </Link>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                >
                Live demo
              </a>
            </div>
          </div>
        </div>
        
                </div>
    
    
  )
}

export const Hero2 = () => {
  return(
    <section className="px-4 py-32 mx-auto max-w-7xl">
  <div className="w-full mx-auto text-left md:w-11/12 xl:w-8/12 md:text-center">
    <h1 className="mb-3 text-4xl font-bold text-gray-900 md:text-5xl md:leading-tight md:font-extrabold">A secure, faster way to transfer.</h1>
    <p className="mb-6 text-lg text-gray-500 md:text-xl md:leading-normal">
      Were on a mission to bring transparency to finance. We charge as little as possible, and we always show you upfront. No hidden fees. No bad exchange rates. No surprises.
    </p>
    <form className="grid w-full grid-cols-1 gap-3 pt-1 mx-auto mb-8 lg:grid-cols-6 md:w-7/12">
      <label className="col-auto lg:col-span-4">
        <span className="sr-only">Your Email</span>
        <input className="mt-0 form-input form-input-lg" type="email" placeholder="Enter your email..."  />
      </label>
      <button className="w-full col-auto btn btn-primary btn-lg lg:col-span-2" type="submit">Get Started</button>
    </form>
    <div className="flex flex-col justify-start mb-3 space-x-0 space-y-2 text-xs text-gray-600 md:flex-row md:justify-center md:space-x-8 md:space-y-0">
      <div className="flex items-center">
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-green-600">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
        </svg>
        No credit card required
      </div>
      <div className="flex items-center">
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-green-600">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
        </svg>
        14 days free
      </div>
      <div className="flex items-center">
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-green-600">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
        </svg>
        Cancel anytime
      </div>
    </div>
  </div>
</section>

  )
}