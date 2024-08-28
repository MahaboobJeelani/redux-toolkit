import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Dashboard from './Redux/Dashboard'
import Cart from './Redux/Cart'
import Rootlayout from './Redux/Rootlayout'


const App = () => {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Rootlayout />}>
      <Route index element={<Dashboard />} />
      <Route path='/cart' element={<Cart />} />
    </Route>
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App