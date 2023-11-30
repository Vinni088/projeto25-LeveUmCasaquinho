import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import forecastMock from './assets/sampleForecast.json';
import dadosMock from './assets/sampleWeather.json';
import { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import Logo from './components/logdiv.jsx';
import styled from 'styled-components';

import LocationInfo from './components/cityInfo.jsx';
import DivSearch from './components/divBusca.jsx';
import DataSummary from './components/dataSummary.jsx';
import InfoHoje from './components/infoHoje.jsx';

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


  function handleMenuChange(string) {
    if (menuSelect !== string) {
      setMenuSelect(string)
      console.log(string)
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

        <DataSummary
          DataPresent={DataPresent}
          setTempUnit={setTempUnit}
          TempUnit={TempUnit}
        />

      </SideMenu>

      <Dashboard>
        <DashboardMenu>
          <p onClick={() => { handleMenuChange('hoje') }} style={{ color: menuSelect === 'hoje' ? '#222222' : '#C8C8C8' }} >
            Hoje
          </p>
          <p onClick={() => { handleMenuChange('proxDias') }} style={{ color: menuSelect === 'proxDias' ? '#222222' : '#C8C8C8' }} >
            Próximos dias
          </p>
        </DashboardMenu>

        <DashboardHoje style={{ display: menuSelect === 'hoje' ? 'unset' : 'none' }}>
          <LocationInfo
            cityName={DataPresent.name}
            latitude={DataPresent.coord.lat}
            longitude={DataPresent.coord.lon}
          />
          <InfoHoje
            DataPresent={DataPresent}
            TempUnit={TempUnit}
          />

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
        
        <p style={{ position: 'absolute', bottom: '15px', left: '39vw' }}>
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
    padding-bottom: 30px;
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
