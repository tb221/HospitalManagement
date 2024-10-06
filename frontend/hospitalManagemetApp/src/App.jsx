import { useState } from 'react'
import './App.css'
import Body from './components/Body'
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Cardiology from './components/Deaprtments/Cardiology';
import Neurology from './components/Deaprtments/Neurology';
import Pediatrics from './components/Deaprtments/Pediatrics';
import Pulmonology from './components/Deaprtments/Pulmonology';
import GeneralMediceine from './components/Deaprtments/GeneralMediceine';
import Nephrology from './components/Deaprtments/Nephrology';
import Register from './components/Register';
import { Toaster } from 'react-hot-toast';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
  },
  {
    path:"/departments/cardiology",
    element:<Cardiology />,
  },
  {
    path:"/departments/nephrology",
    element:<Nephrology />,
  },
  {
    path:"/departments/neurology",
    element:<Neurology />,
  },
  {
    path:"/departments/pediatrics",
    element:<Pediatrics />,
  },
  {
    path:"/departments/pulmonology",
    element:<Pulmonology />,
  },
  {
    path:"/departments/generalmediceine",
    element:<GeneralMediceine />,
  },
  {
    path:"/register",
    element:<Register />,
  },
]);
function App() {
 
  return (
    <RouterProvider router={router} >
     
      <Body />
      <Toaster />
    </RouterProvider>
  )
}

export default App
