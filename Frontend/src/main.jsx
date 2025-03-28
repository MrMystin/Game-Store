import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";

import Create from './pages/create/create.jsx'
import Delete from './pages/delete/delete.jsx'
import Search from './pages/search/search.jsx'
import Update from './pages/update/update.jsx'
import Login from './pages/login/login.jsx'
import Buy from  './pages/buy/buy.jsx'
import Invoice from './components/invoice/invoice.jsx'

import App from './App.jsx'
import Games from './pages/games/games.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: (<App />)
  },
  {
    path: "/games",
    element: (<Games />)
  },
  {
    path: "/create",
    element: (<Create />)
  },
  {
    path: "/delete",
    element: (<Delete />)
  },
  {
    path: "/search",
    element: (<Search />)
  },
  {
    path: "/update",
    element: (<Update />)
  },
  {
    path: "/login",
    element: (<Login />)
  },
  {
    path: "/invoice",
    element: (<Invoice />)
  },
  {
    path: "/buy",
    element: (<Buy />)
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
