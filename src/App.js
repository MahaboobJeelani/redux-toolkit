// import React from 'react'
// import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
// import Dashboard from './Redux/Dashboard'
// import Cart from './Redux/Cart'
// import Rootlayout from './Redux/Rootlayout'


// const App = () => {

//   const router = createBrowserRouter(createRoutesFromElements(
//     <Route path='/' element={<Rootlayout />}>
//       <Route index element={<Dashboard />} />
//       <Route path='/cart' element={<Cart />} />
//     </Route>
//   ))

//   return (
//     <RouterProvider router={router} />
//   )
// }

// export default App


import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Navbar from './Crud-redux/Components/Navbar';
import Create from './Crud-redux/Components/Create';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Read from './Crud-redux/Components/Read';
import Updated from './Crud-redux/Components/Updated'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Create />} />
        <Route path='/read' element={<Read />} />
        <Route path='/edit/:id' element={<Updated />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;

