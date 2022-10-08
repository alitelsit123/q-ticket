import { useState } from "react"
import {useAtom} from 'jotai'
import { user } from "../stores/app"

export default function Login(props) {
  const [,setUser] = useAtom(user)
  const [canLogin,setCanLogin] = useState(true)
  const [email,setEmail] = useState(null)
  const [password,setPassword] = useState(null)
  const [error, setError] = useState(null)

  const _handleLogin = () =>{
    setCanLogin(false)
    setError(null)
    setTimeout(() => {
      if(email && password) {
        setUser({email,password})
      }
      setError('Email & Password Required!')
      setCanLogin(true)
    }, 1000)
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-blue-700 shadow rounded">
      <div className="w-[300px] bg-white px-4 py-2 pb-7 flex flex-col">
        <div className="text-blue-700 text-2xl font-black mx-auto py-4">Login Form</div>
        <div className="flex-grow mb-7">
          <input type="text" onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 px-3 py-1 w-full mb-4 focus:ring-none focus:outline-none" placeholder="Email" />
          <input type="password" onChange={(e) => setPassword(e.target.value)} className="border border-gray-300 px-3 py-1 w-full focus:ring-none focus:outline-none" placeholder="Password" />
          {
            error &&
            <div className="mt-7 text-center text-red-500">{error}</div>
          }
        </div>
        <button type="button" onClick={_handleLogin} className={`bg-blue-700 w-full text-white py-2 rounded ${canLogin ? '': 'bg-gray-300 text-gray-500'}`} disabled={!canLogin}>Login</button>
      </div>
    </div>
  )
}