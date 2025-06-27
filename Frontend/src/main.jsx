import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";

import Create from './pages/create/create.jsx'
import Account from './pages/account/account.jsx'
import Login from './pages/login/login.jsx'
import Buy from  './pages/buy/buy.jsx'
import Invoice from './components/invoice/invoice.jsx'
import App from './App.jsx'
import Games from './pages/games/games.jsx'
import Cart from './pages/cart/cart.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: (<App />)
  },
  {
    path: "/games/:id",
    element: (<Games />)
  },
  {
    path: "/create",
    element: (<Create />)
  },
  {
    path: "/account",
    element: (<Account />)
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
  },
  {
    path: "/cart",
    element: (<Cart />)
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
