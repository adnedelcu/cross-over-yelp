import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Homepage } from './components/Homepage.jsx'
import { RestaurantList } from './components/RestaurantList.jsx'
import { Restaurant } from './components/Restaurant.jsx'
import './index.css'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />
  },
  {
    path: "/restaurants",
    element: <RestaurantList />
  },
  {
    path: "/restaurants/:id",
    element: <Restaurant />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
