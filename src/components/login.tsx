import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';

export const Login = () => {
  const onFinish = async (values: any) => {
    // console.log('Success:', values);
    const response = await axios.post('/api/auth/login', {email: values.username, password: values.password})
    // console.log(response);
    
  };

  const onFinishFailed = (errorInfo: any) => {
    // console.log('Failed:', errorInfo);
  };

  return (
//     <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 bg-gray-50 text-gray-800">
// 	<h2 className="mb-3 text-3xl font-semibold text-center">Login to your account</h2>
// 	<p className="text-sm text-center text-gray-600">Dont have account?
// 		<a href="#" rel="noopener noreferrer" className="focus:underline hover:underline">Sign up here</a>
// 	</p>
// 	<div className="my-6 space-y-4">
// 		<button aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-gray-600 focus:ring-violet-600">
// 			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
// 				<path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
// 			</svg>
// 			<p>Login with Google</p>
// 		</button>
// 		<button aria-label="Login with GitHub" role="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-gray-600 focus:ring-violet-600">
// 			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
// 				<path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
// 			</svg>
// 			<p>Login with GitHub</p>
// 		</button>
// 		<button aria-label="Login with Twitter" role="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-gray-600 focus:ring-violet-600">
// 			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
// 				<path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"></path>
// 			</svg>
// 			<p>Login with Twitter</p>
// 		</button>
// 	</div>
// 	<div className="flex items-center w-full my-4">
// 		<hr className="w-full text-gray-600"/>
// 		<p className="px-3 text-gray-600">OR</p>
// 		<hr className="w-full text-gray-600"/>
// 	</div>
// 	<form action="" className="space-y-8 ng-untouched ng-pristine ng-valid">
// 		<div className="space-y-4">
// 			<div className="space-y-2">
// 				<label className="block text-sm">Email address</label>
// 				<input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600" />
// 			</div>
// 			<div className="space-y-2">
// 				<div className="flex justify-between">
// 					<label className="text-sm">Password</label>
// 					<a rel="noopener noreferrer" href="#" className="text-xs hover:underline text-gray-600">Forgot password?</a>
// 				</div>
// 				<input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600" />
// 			</div>
// 		</div>
// 		<button type="button" className="w-full px-8 py-3 font-semibold rounded-md bg-violet-600 text-gray-50">Sign in</button>
// 	</form>
// </div>
      <section className="px-4 py-24 mx-auto max-w-7xl">
      <div className="w-full mx-auto space-y-5 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12">
        <h1 className="text-4xl font-semibold text-center text-gray-900">Login</h1>
        <div className="pb-6 space-y-2 border-b border-gray-200">
          <a href="#" className="w-full py-3 btn btn-icon btn-google">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="currentColor" className="mr-1">
              <path d="M20.283,10.356h-8.327v3.451h4.792c-0.446,2.193-2.313,3.453-4.792,3.453c-2.923,0-5.279-2.356-5.279-5.28	c0-2.923,2.356-5.279,5.279-5.279c1.259,0,2.397,0.447,3.29,1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233	c-4.954,0-8.934,3.979-8.934,8.934c0,4.955,3.979,8.934,8.934,8.934c4.467,0,8.529-3.249,8.529-8.934	C20.485,11.453,20.404,10.884,20.283,10.356z" />
            </svg>
            Continue with Google
          </a>
          <a href="#" className="w-full py-3 btn btn-icon btn-dark">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="currentColor" className="mr-1">
              <path d="M19.665,16.811c-0.287,0.664-0.627,1.275-1.021,1.837c-0.537,0.767-0.978,1.297-1.316,1.592	c-0.525,0.482-1.089,0.73-1.692,0.744c-0.432,0-0.954-0.123-1.562-0.373c-0.61-0.249-1.17-0.371-1.683-0.371	c-0.537,0-1.113,0.122-1.73,0.371c-0.616,0.25-1.114,0.381-1.495,0.393c-0.577,0.025-1.154-0.229-1.729-0.764	c-0.367-0.32-0.826-0.87-1.377-1.648c-0.59-0.829-1.075-1.794-1.455-2.891c-0.407-1.187-0.611-2.335-0.611-3.447	c0-1.273,0.275-2.372,0.826-3.292c0.434-0.74,1.01-1.323,1.73-1.751C7.271,6.782,8.051,6.563,8.89,6.549	c0.46,0,1.063,0.142,1.81,0.422s1.227,0.422,1.436,0.422c0.158,0,0.689-0.167,1.593-0.498c0.853-0.307,1.573-0.434,2.163-0.384	c1.6,0.129,2.801,0.759,3.6,1.895c-1.43,0.867-2.137,2.08-2.123,3.637c0.012,1.213,0.453,2.222,1.317,3.023	c0.392,0.372,0.829,0.659,1.315,0.863C19.895,16.236,19.783,16.529,19.665,16.811L19.665,16.811z M15.998,2.38	c0,0.95-0.348,1.838-1.039,2.659c-0.836,0.976-1.846,1.541-2.941,1.452c-0.014-0.114-0.021-0.234-0.021-0.36	c0-0.913,0.396-1.889,1.103-2.688c0.352-0.404,0.8-0.741,1.343-1.009c0.542-0.264,1.054-0.41,1.536-0.435	C15.992,2.127,15.998,2.254,15.998,2.38L15.998,2.38z" />
            </svg>
            Continue with Apple
          </a>
        </div>
        <form className="space-y-4">
          <label className="block">
            <span className="block mb-1 text-xs font-medium text-gray-700">Your Email</span>
            <input className="form-input" type="email" placeholder="Ex. james@bond.com" inputMode="email" required />
          </label>
          <label className="block">
            <span className="block mb-1 text-xs font-medium text-gray-700">Your Password</span>
            <input className="form-input" type="password" placeholder="••••••••" required />
          </label>
          <input type="submit" className="w-full py-3 btn btn-primary" defaultValue="Continue with email" />
        </form>
        <div className="my-2 text-center">
          <a href="#" className="text-sm text-gray-700 underline hover:text-indigo-700">Forgot password</a>
        </div>
      </div>
    </section>
  )
}