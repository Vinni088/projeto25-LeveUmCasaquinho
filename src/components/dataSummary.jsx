// DataSummary.jsx
import React from 'react';
import Switch from '@mui/material/Switch';
import imagens from '../assets/images.index.js';
import styled from 'styled-components';

const DataSummary = ({ DataPresent, TempUnit, setTempUnit }) => {

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

    function handleTemperature(temperatura) {
        if (TempUnit === 'C') {
            let temperatureCelsius = (temperatura - 273.15);
            return (temperatureCelsius.toFixed(1) + " °C")
        } else if (TempUnit === 'F') {
            let temperatureFahrenheit = (9 / 5) * (temperatura - 273.15) + 32;
            return temperatureFahrenheit.toFixed(1) + " °F";
        }
    }

    return (
        <DataSummaryDiv>
            <div>
                <img src={imagens[DataPresent.weather[0].icon]} alt="" />
                <p style={{ color: mapSummaryStatus(DataPresent.weather[0].main).cor }}>
                    {handleTemperature(DataPresent.main.temp)}
                </p>
            </div>

            <h1>{mapSummaryStatus(DataPresent.weather[0].main).descricao}</h1>

            <p>{handleData(DataPresent.dt).data}</p>

            <p>{handleData(DataPresent.dt).equivalente}</p>

            <div id="switch" style={{ display: "flex", justifyContent: 'center' }}>
                <Switch onClick={handleChangeTempUnit} /> °F
            </div>

            <h2 style={{ position: 'absolute', bottom: '15px', left: '4vw' }}>
                Todos os direitos reservados. 2023.
            </h2>
        </DataSummaryDiv>
    );
};

export default DataSummary;

const DataSummaryDiv = styled.div`
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
    font-weight: 400;
    text-align: center;
  }
  #switch {
    font-family: 'Poppins';
    font-size: 2vmin;
    font-weight: 400;
  }
`