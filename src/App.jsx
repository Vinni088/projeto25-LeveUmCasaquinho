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
    'Clouds': { descricao: 'Nublado', cor: 'gray' },
    'Rain': { descricao: 'Chovendo', cor: 'blue' },
    'Snow': { descricao: 'Nevando', cor: 'lightgray' },
    'Thunderstorm': { descricao: 'Tempestade', cor: 'purple' },
    'Drizzle': { descricao: 'Chuviscando', cor: 'lightblue' },
    'Mist': { descricao: 'Neblina', cor: 'lightgray' },
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
  const [menuSelect, setMenuSelect] = useState('hoje')

  useEffect(() => {
    //console.log(dadosMock);
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

  function handleData(timestamp) {
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

  function handleMenuChange(string) {
    if (menuSelect !== string) {
      setMenuSelect(string)
      console.log(string)
    }

  }
  function handleCasaquinho(temp) {
    if (temp < 290) {
      return 'Você deve levar um casaquinho!'
    } else {
      return 'Não, você não deve levar um casaquinho!'
    }
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
            {handleData(dadosMock.dt).data}
          </p>
          <p>{/* Data: dia da semana + horário */}
            {handleData(dadosMock.dt).equivalente}
          </p>

          <h2>
            Todos os direitos reservados. 2023.
          </h2>
        </DataSummary>
      </SideMenu>
      <Dashboard>
        <DashboardMenu>
          <p
            onClick={() => { handleMenuChange('hoje') }}
            style={{ color: menuSelect === 'hoje' ? '#222222' : '#C8C8C8' }}
          >
            Hoje
          </p>
          <p
            onClick={() => { handleMenuChange('proxDias') }}
            style={{ color: menuSelect === 'proxDias' ? '#222222' : '#C8C8C8' }}
          >
            Próximos dias
          </p>
        </DashboardMenu>
        <DashboardHoje style={{ display: menuSelect === 'hoje' ? 'unset' : 'none' }}>
          <h1>
            {dadosMock.name}
          </h1>
          <div id='coords'>
            <h3>
              Lat: {dadosMock.coord.lat}
            </h3>
            <h3>
              Long: {dadosMock.coord.lon}
            </h3>
          </div>
          <div id='baloons'>
            <div id='prop'>
              <p>
                Mínima: <br />
              </p>
              {handleTemperature(dadosMock.main.temp_min)}
            </div>
            <div id='prop'>
              <p>
                Máxima: <br />
              </p>
              {handleTemperature(dadosMock.main.temp_max)}
            </div>
            <div id='prop'>
              <p>
                Umidade: <br />
              </p>
              {dadosMock.main.humidity}%
            </div>
            <div id='prop'>
              <p>
                Velocidade do vento: <br />
              </p>
              {dadosMock.wind.speed} m/s
            </div>
            <h4>
              {handleCasaquinho(dadosMock.main.temp)}
            </h4>
          </div>
        </DashboardHoje>
        <DashboardProx style={{ display: menuSelect === 'proxDias' ? 'unset' : 'none' }}>
          aqui vai ter a parte de próximos dias do dashboard
        </DashboardProx>
        <p>Dados fornecidos pela <a href="https://openweathermap.org/"> Open Weather API </a> </p>
      </Dashboard>
    </Body>
  )
}

////////////////// Estilos gerais //////////////////
const Body = styled.div`
  * {
    transition: all 0.5s ease;
  }
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
    p {
      color: ${(mapSummaryStatus(dadosMock.weather[0].main)).cor};
    }
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
  background-color: #D8D8D8;
  height: 100vh;
  width: 65vw;
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: flex-start;
  align-items: center;
  padding: 6vh 2vw;
  p {
    width: 100%;
    text-align: left;
    font-family: 'Poppins';
    font-weight: 400;
    a {
      text-decoration: none;
      color: #96A7F2;
    }
  }
`
const DashboardMenu = styled.div`
  padding-left: 2vw;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  p {
    cursor: pointer;
    font-family: 'Poppins';
    font-size: 5vmin;
    font-weight: 400;
    text-align: left;
  }
`
const DashboardHoje = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 2vw;
  h1 {
    width: 100%;
    font-family: 'Poppins';
    font-size: 15vmin;
    font-weight: 400;
    text-align: left;
  }
  h3 {
    font-family: 'Poppins';
    font-size: 2vmin;
    font-weight: 300;
    text-align: left;
  }
  h4 {
    font-family: 'Poppins';
    font-size: 2vw;
    font-style: italic;
    color: gray;
  }
  #coords {
    padding: 10px 0px;
    gap: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  #baloons {
    width: 100%;
    padding-top: 20px;
    gap: 40px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
  #prop {
    width: 25vw;
    height: 15vh;
    border-radius: 32px;
    padding: 5%;
    background-color: #4D4494;
    gap: 2px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    font-family: 'Poppins';
    font-size: 2vw;
    font-weight: 700;
    color: white;
    p {
      font-size: 1vw;
    }
  }
`
const DashboardProx = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid blue;
  padding-left: 2vw;
`

export default App
