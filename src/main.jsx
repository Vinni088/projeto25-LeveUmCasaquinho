import ResetStyle from "./style/ResetStyle.js"
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import React from 'react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ResetStyle/>
    <App />
  </React.StrictMode>,
)
