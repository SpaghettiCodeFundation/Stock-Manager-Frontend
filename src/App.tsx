import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import {
 QueryClientProvider,
 QueryClient
} from '@tanstack/react-query'

import Login from './pages/login'
import IsAuthenticateGroup from './components/IsAuthenticateGroup'
import Product from './pages/Product'
import Categories from './pages/Categories'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <Route path="/dashboard" element={<IsAuthenticateGroup/>}>
            <Route index element={<Home/>}></Route>
            <Route path="/dashboard/categories" element={<Categories/>}></Route>
            <Route path="/dashboard/products" element={<Product/>}></Route>
          </Route>
      </BrowserRouter>
      </QueryClientProvider>
  )
}

