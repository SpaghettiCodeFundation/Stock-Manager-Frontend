import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/login'
import IsAuthenticateGroup from './components/IsAuthenticateGroup'
import Home from './pages/Home'

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<IsAuthenticateGroup/>}>
            <Route index element={<Home/>}></Route>
          </Route>
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
      </BrowserRouter>
  )
}

