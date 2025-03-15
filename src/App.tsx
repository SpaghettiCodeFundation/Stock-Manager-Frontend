import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import {
 QueryClientProvider,
 QueryClient
} from '@tanstack/react-query'

import Login from './pages/login'
import IsAuthenticateGroup from './components/IsAuthenticateGroup'
import Home from './pages/Home'
import Categories from './pages/Categories'
import Providers from './pages/Providers'
import Clients from './pages/Clients'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<IsAuthenticateGroup/>}>
            <Route index element={<Home/>}></Route>
            <Route path="/dashboard/categories" element={<Categories/>}></Route>
            <Route path="/dashboard/providers" element={<Providers/>}></Route>
            <Route path="/dashboard/clients" element={<Clients/>}></Route>
          </Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/" element={<Navigate to="/dashboard"/>}></Route>
        </Routes>
      </BrowserRouter>
      </QueryClientProvider>
  )
}

