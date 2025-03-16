import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import {
 QueryClientProvider,
 QueryClient
} from '@tanstack/react-query'

import Login from './pages/login'
import IsAuthenticateGroup from './components/IsAuthenticateGroup'
import Home from './pages/Product'
import Categories from './pages/Categories'
import UsersPage from './pages/users'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<IsAuthenticateGroup/>}>
            <Route index element={<Home/>}></Route>
            <Route path="/dashboard/categories" element={<Categories/>}></Route>
            <Route path="/dashboard/users" element={<UsersPage/>}></Route>
            <Route path="/dashboard/products" element={<Home/>}></Route>
          </Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/users" element={<UsersPage/>}></Route>
          <Route path="/" element={<Navigate to="/dashboard"/>}></Route>
          <Route path="product" element={<Home/>}></Route>
        </Routes>
      </BrowserRouter>
      </QueryClientProvider>
  )
}