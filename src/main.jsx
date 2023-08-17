import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserContextProvider } from './context/UserContext.jsx'
import { CartContextProvider } from './context/CartContext.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <CartContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </CartContextProvider>
  </UserContextProvider>
  ,
)
