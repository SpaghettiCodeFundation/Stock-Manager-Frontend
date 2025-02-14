import React from "react"
import {Outlet, Navigate} from "react-router-dom"
import MainLayout from "@/components/layouts/MainLayout.tsx"

const isAuthenticateGroup: React.FC = () => {
  const isAuth: boolean = localStorage.getItem('isAuth') === 'true'

  return (
    <div>{isAuth ? <MainLayout><Outlet/></MainLayout>: <Navigate to="/login"/>}</div>
  )
}

export default isAuthenticateGroup 
