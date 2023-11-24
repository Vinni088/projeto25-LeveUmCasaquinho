import { useState, useEffect } from 'react';
import casaco from "./assets/casaco.png"
import styled from 'styled-components';
import Swal from 'sweetalert2';
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0)
  const [req, setReq] = useState('')
  const [url_mock, setUrl_mock] = useState('https://jsonplaceholder.typicode.com/photos')
  
  useEffect(() => {
    /*
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
    */
  }, [url_mock])

  return (
    <Body>
      <SideMenu>
        <LogoDiv>
          <img 
            src={casaco} 
            alt="Logomarca 'Levo um casasquinho' TM "
            title="Logomarca 'Levo um casasquinho' TM "
          />
          <p>
            Levo um casaquinho?
          </p>
        </LogoDiv>
        <div>
          Aqui ficará o menu lateral
        </div>
      </SideMenu>
      <Dashboard>
        <div>
          aqui ficará o dashboard
        </div>
      </Dashboard>
    </Body>
  )
}

const Body = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #D8D8D8;
`
const SideMenu = styled.div`
  height: 100vh;
  width: 35vw;
  padding: 4.2vmin;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
`
const Dashboard = styled.div`
  height: 100vh;
  width: 65vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const LogoDiv = styled.div`
  height: 120px;
  width: 100%;
  gap: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 10vw;
    border: 1px red solid;
  }
  p {
    font-family: 'Poppins', sans-serif;
    font-size: 3.2vw;
    font-weight: 600;
    text-align: left;
    color: #222222;
    border: 1px red solid;
  }
`


export default App
