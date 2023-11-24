import dadosMock from './assets/sampleWeather.json';
import imagens from './assets/images.index.js';
import { useState, useEffect } from 'react';
import 'sweetalert2/src/sweetalert2.scss';
import casaco from './assets/casaco.png';
import styled from 'styled-components';
import lupa from './assets/lupa.png';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import axios from 'axios';

function mapSummaryStatus(status) {
  const mapeamento = {
    'Clear': { descricao: 'Céu aberto', cor: 'orange' },
    'Clouds': { descricao: 'Nublado', cor: 'grey' },
    'Rain': { descricao: 'Chovendo', cor: 'blue' },
    'Snow': { descricao: 'Nevando', cor: 'light-grey' },
    'Thunderstorm': { descricao: 'Tempestade', cor: 'purple' },
    'Drizzle': { descricao: 'Chuviscando', cor: 'light-blue' },
    'Mist': { descricao: 'Neblina', cor: 'light-grey' },
  };

  if (mapeamento[status]) {
    return mapeamento[status];
  } else {
    return { descricao: 'Clima desconhecido', cor: 'black' };
  }
}

function App() {
  const [req, setReq] = useState('');
  const [data, setData] = useState({});
  const [inputBusca, setInputBusca] = useState('');
  const [unidadeTemp, setUnidadeTemp] = useState('C')

  useEffect(() => {
    console.log(dadosMock);
    setData(dadosMock);
  }, [])

  function handleSubmit(e) {
    if (e.key === 'Enter') {
      Swal.fire({
        title: "Processando",
        text: "Carregando sua requisição...",
      });
    }
  };

  function handleTemperature(temperatura) {
    if (unidadeTemp === 'C') {
      let temperatureCelsius = (temperatura - 273.15);
      return (temperatureCelsius.toFixed(1) + " °C")
    } else if (unidadeTemp === 'F') {
      let temperatureFahrenheit = (9 / 5) * (temperatureKelvin - 273.15) + 32;
      return temperatureFahrenheit.toFixed(1) + " °F";
    }
  }

  function formatarData(timestamp) {
    if (typeof timestamp !== 'number') {
      throw new Error('O timestamp deve ser um número.');
    }
    const data = new Date(timestamp * 1000);

    const diasDaSemana = [
      'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
    ];

    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
    const diaDaSemana = diasDaSemana[data.getDay()];

    const dataFormatada = `${dia}/${mes}/${ano}`;

    const horaFormatada = `${('0' + data.getHours()).slice(-2)}:${('0' + data.getMinutes()).slice(-2)}`;
    const equivalente = `${diaDaSemana}, ${horaFormatada}`;

    return { data: dataFormatada, equivalente };
  }

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
            onClick={() => handleSubmit({ key: 'Enter' })}
          />
          <InputBusca
            placeholder="Procure por uma cidade"
            type="text"
            value={inputBusca}
            onChange={(e) => setInputBusca(e.target.value)}
            onKeyUp={handleSubmit}
          />
        </DivBusca>
        <DataSummary>
          <div>
            {/* Imagem clima */}
            <img
              src={imagens[dadosMock.weather[0].icon]}
              alt=""
            />
            <p> {/* Temperatura */}
              {handleTemperature(dadosMock.main.temp)}
            </p>
          </div>
          <h1>
            {mapSummaryStatus(dadosMock.weather[0].main).descricao}
          </h1>

          <p>{/* Data: dd/mm/yy */}
            {formatarData(dadosMock.dt).data}
          </p>
          <p>{/* Data: dia da semana + horário */}
            {formatarData(dadosMock.dt).equivalente}
          </p>

          <h2>
            Todos os direitos reservados. 2023.
          </h2>
        </DataSummary>
      </SideMenu>
      <Dashboard>
        <div>
          aqui ficará o dashboard
        </div>
      </Dashboard>
    </Body>
  )
}

////////////////// Estilos gerais //////////////////
const Body = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #D8D8D8;
`
////////////////// Estilos Barra Lateral //////////////////
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
    font-size: 3.6vmin;
    font-weight: 700;
    text-align: left;
    color: #222222;
  }
`
const DivBusca = styled.div`
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
  &:focus {
    outline: none;
  }
`
const DataSummary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Poppins';
    font-size: 4.2vw;
    font-weight: 300;
    line-height: 48px;
    color: ${mapSummaryStatus(dadosMock.weather[0].main).cor};
  }
  h1 {
    width: 100%;
    text-align: center;
    padding-bottom: 20px;
    border-bottom: 1px lightgray solid;
    font-family: 'Poppins';
    font-size: 3.0vw;
    font-weight: 400;
    color: #222222;
  }
  p {
    width: 100%;
    font-family: 'Poppins';
    text-align: center;
    font-size: 2.5;
    font-weight: 500;
    color: #222222;
  }
  h2 {
    padding-top: 17.5vh;
    font-family: 'Poppins';
    font-size: 1%.5;
    font-weight: 300;
    text-align: center;
  }
`

////////////////// Estilos Dashboard //////////////////
const Dashboard = styled.div`
  height: 100vh;
  width: 65vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export default App
