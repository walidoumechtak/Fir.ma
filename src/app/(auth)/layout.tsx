import Navbar  from '@/components/navbar'
import React from 'react'
import { AuthProvider } from '../../context/AuthProvider'

interface LayoutProps {
  children: React.ReactNode
}

const layout = ({ children }: LayoutProps) => {
  return (
    <>
    <AuthProvider>
        <Navbar />
        <div className='flex h-screen items-center justify-center  '>
          {children}
        </div>
    </AuthProvider>
    </>
  )
}

export default layout
