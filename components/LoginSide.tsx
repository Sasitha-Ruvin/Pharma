import React from 'react'
import logo from '../components/Images/logo.jpg'
import Image from "next/image";

const LoginSide = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-sky-950 text-white p-8">
        <div className="w-32 h-32 bg-gray-300 rounded-md mb-4">
          <Image src={logo} alt="Logo" className="w-32 h-32" />
        </div>
        <h1 className="text-4xl font-bold">PharmaSys</h1>
        <p className="text-lg mt-2">Your Health, Our Priority</p>
    </div>
  )
}

export default LoginSide