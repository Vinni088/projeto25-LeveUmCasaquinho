import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Swal from 'sweetalert2';
import axios from 'axios';
import './App.css';

function App() {
  const [count, setCount] = useState(0)
  const [req, setReq] = useState('')
  const [url_mock, setUrl_mock] = useState('https://jsonplaceholder.typicode.com/photos')
  
  useEffect(() => {
    axios.get(url_mock)
      .then(res => {
        console.log(res.data)
        setReq(res.data)
      })
      .catch(err => {
        Swal.fire({
          title: 'Erro!',
          text: 'Houve um problema ao obter os dados da página :(',
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      })
  }, [url_mock])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Página em obras:</h1>
      <div>
      </div>
      <ul>
        {
          req.length > 0 ?
            req.map(foto => { return(<li key={foto.id}>{foto.title} </li>) }) : "notOK"
        }
      </ul>
    </>
  )
}

export default App
