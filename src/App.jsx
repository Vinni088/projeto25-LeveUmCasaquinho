import dadosMock from './assets/sampleWeather.json';
import imagens from './assets/images.index.js';
import { useState, useEffect } from 'react';
import casaco from './assets/casaco.png'
import styled from 'styled-components';
import lupa from './assets/lupa.png'
import Swal from 'sweetalert2';
import axios from 'axios';

function App() {
  const [req, setReq] = useState('');
  const [data, setData] = useState({})
  const [inputBusca, setInputBusca] = useState('')

  useEffect(() => {
    console.log(dadosMock);
    console.log(imagens);
    setData(dadosMock);
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('Tecla Enter pressionada');
    }
  };
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
        <DivBusca>
          <img 
            src={lupa} 
            alt='Realize sua busca!' 
            title='Realize sua busca' 
            onClick={() => handleKeyDown({key: 'Enter'})}
          />
          <InputBusca
            placeholder="Procure por uma cidade"
            type="text"
            value={inputBusca}
            onChange={(e) => setInputBusca(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </DivBusca>

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
  padding-top: 4vmin;
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
`

const LogoDiv = styled.div`
  padding: 4.2vmin;
  height: 120px;
  width: 100%;
  gap: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 10vmin;
    width: 10vmin;
  }
  p {
    font-family: 'Poppins', 'sans-serif';
    font-size: 4vmin;
    font-weight: 700;
    text-align: left;
    color: #222222;
  }
`
const DivBusca = styled.div`
  border: 1px red solid;
  position: relative;
  padding: 4.2vmin;
  width: 100%;
  height: 100px;
  padding: 10px;
  img { 
    cursor: pointer;
    position: absolute;
    top: 30px;
    left: 20px;
  }
`
const InputBusca = styled.input`
  width: 100%;
  height: 80px;
  text-align: center;
  border-radius: 24px;
  color: #424243;
  background-color: #EDEDEF;
  border: 0px solid lightgray;
  font-size: 22px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0em;
  &:focus {
    outline: none;
  }
`


const Dashboard = styled.div`
  height: 100vh;
  width: 65vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export default App
