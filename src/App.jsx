import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import forecastMock from './assets/sampleForecast.json';
import dadosMock from './assets/sampleWeather.json';
import imagens from './assets/images.index.js';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useState, useEffect } from 'react';
import 'sweetalert2/src/sweetalert2.scss';
import Switch from '@mui/material/Switch';
import Logo from './components/logdiv.jsx';
import styled from 'styled-components';

import LocationInfo from './components/cityInfo.jsx';
import DivSearch from './components/divBusca.jsx';

function App() {
  const [DataPresent, setDataPresent] = useState(dadosMock);
  const [DataForecast, setDataForecast] = useState(forecastMock);
  const [TempUnit, setTempUnit] = useState('C')
  const [menuSelect, setMenuSelect] = useState('hoje')

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];


  const chartData = DataForecast.list.map(item => ({
    dt: new Date(item.dt * 1000), // Convertendo timestamp para uma data JS
    temp: handleTemperatureChart(item.main.temp),
  }));
  const minYValue = Math.min(...DataForecast.list.map(item => handleTemperatureChart(item.main.temp)));
  const maxYValue = Math.max(...DataForecast.list.map(item => handleTemperatureChart(item.main.temp)));

  useEffect(() => {
    setDataPresent(dadosMock);
    setDataForecast(forecastMock)
  }, [])


  function handleTemperature(temperatura) {
    if (TempUnit === 'C') {
      let temperatureCelsius = (temperatura - 273.15);
      return (temperatureCelsius.toFixed(1) + " °C")
    } else if (TempUnit === 'F') {
      let temperatureFahrenheit = (9 / 5) * (temperatura - 273.15) + 32;
      return temperatureFahrenheit.toFixed(1) + " °F";
    }
  }

  function handleTemperatureChart(temperatura) {
    if (TempUnit === 'C') {
      let temperatureCelsius = (temperatura - 273.15);
      return (temperatureCelsius.toFixed(2))
    } else if (TempUnit === 'F') {
      let temperatureFahrenheit = (9 / 5) * (temperatura - 273.15) + 32;
      return temperatureFahrenheit.toFixed(2);
    }
  }

  function handleDateShow(dataString) {
    const meses = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    const data = new Date(dataString);
    const diaSemana = weekDays[data.getDay()];
    const dia = data.getDate();
    const mes = meses[data.getMonth()];
    const ano = data.getFullYear();

    return `${diaSemana}, ${dia} ${mes} ${ano}`;
  }

  function mapSummaryStatus(status) {
    const mapeamento = {
      'Clear': { descricao: 'Céu aberto', cor: '#FFA500' },
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

  function handleChangeTempUnit() {
    if (TempUnit === 'C') {
      setTempUnit('F')
    } else {
      setTempUnit('C')
    }
  }

  function handleData(timestamp) {
    if (typeof timestamp !== 'number') {
      throw new Error('O timestamp deve ser um número.');
    }
    const data = new Date(timestamp * 1000);

    const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

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
        <Logo />
        <DivSearch
          setDataPresent={setDataPresent}
          setDataForecast={setDataForecast}
        />
        <DataSummary>
          <div>
            {/* Imagem clima */}
            <img
              src={imagens[DataPresent.weather[0].icon]}
              alt=""
            />
            <p style={{ color: (mapSummaryStatus(DataPresent.weather[0].main)).cor }}> {/* Temperatura */}
              {handleTemperature(DataPresent.main.temp)}
            </p>
          </div>
          <h1 >
            {mapSummaryStatus(DataPresent.weather[0].main).descricao}
          </h1>

          <p>{/* Data: dd/mm/yy */}
            {handleData(DataPresent.dt).data}
          </p>
          <p>{/* Data: dia da semana + horário */}
            {handleData(DataPresent.dt).equivalente}
          </p>
          <div id='switch' style={{ display: "flex", justifyContent: 'center' }}>
            <Switch onClick={handleChangeTempUnit} /> °F
          </div>
          <h2 style={{position: 'absolute', bottom: '20px', left: '4vw'}}>
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
          <LocationInfo
            cityName={DataPresent.name}
            latitude={DataPresent.coord.lat}
            longitude={DataPresent.coord.lon}
          />
          <div id='baloons'>
            <div id='prop'>
              <p>
                Mínima: <br />
              </p>
              {handleTemperature(DataPresent.main.temp_min)}
            </div>
            <div id='prop'>
              <p>
                Máxima: <br />
              </p>
              {handleTemperature(DataPresent.main.temp_max)}
            </div>
            <div id='prop'>
              <p>
                Umidade: <br />
              </p>
              {DataPresent.main.humidity}%
            </div>
            <div id='prop'>
              <p>
                Velocidade do vento: <br />
              </p>
              {DataPresent.wind.speed} m/s
            </div>
            <h4>
              {handleCasaquinho(DataPresent.main.temp)}
            </h4>
          </div>
        </DashboardHoje>
        <DashboardProx style={{ display: menuSelect === 'proxDias' ? 'unset' : 'none' }}>
          <LocationInfo
            cityName={DataPresent.name}
            latitude={DataPresent.coord.lat}
            longitude={DataPresent.coord.lon}
          />
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              style={{ backgroundColor: 'white', borderRadius: '10px' }}
            >
              <XAxis
                dataKey="dt"
                tickFormatter={(date) => `${date.getDate()}/${date.getMonth() + 1} (${weekDays[date.getDay()]})`} />
              <YAxis
                tickFormatter={(temp) => `${temp}°${TempUnit}`}
                domain={[Math.round(minYValue) - 2, Math.round(maxYValue) + 2]}
              />
              <CartesianGrid
                stroke="#eee"
                strokeDasharray="5 5"
              />
              <Tooltip
                labelFormatter={(value) => `${handleDateShow(value.toDateString())}`}
                wrapperStyle={{ backgroundColor: 'lightgray' }}
                formatter={(temp) => `${temp}°${TempUnit}`}
              />
              <Line type="monotone" dataKey="temp" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </DashboardProx>
        <p style={{position: 'absolute', bottom: '20px', left: '39vw'}}>
          Dados fornecidos pela <a href="https://openweathermap.org/"> Open Weather API </a>
        </p>
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
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;

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

  // Utilizar em um navegador que suporte o tookit
  ::-webkit-scrollbar {
    width: 2px !important;
  }

  ::-webkit-scrollbar-thumb {
    background-color: white !important;
    border-radius: 5px !important;
  }

  ::-webkit-scrollbar-track {
    background-color: gray !important;
  }
`
////////////////// Estilos Barra Lateral //////////////////
const SideMenu = styled.div`
  min-height: 100vh;
  min-width: 35vw;
  padding-top: 4vmin;
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
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
    padding-top: 8.5vh;
    font-family: 'Poppins';
    font-size: 1.5;
    font-weight: 300;
    text-align: center;
  }
  #switch {
    font-family: 'Poppins';
    font-size: 2vmin;
    font-weight: 400;
  }
`

////////////////// Estilos Dashboard //////////////////
const Dashboard = styled.div`
  background-color: #D8D8D8;
  min-height: 100vh;
  min-width: 65vw;
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
`
const DashboardProx = styled.div`
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
`

export default App
