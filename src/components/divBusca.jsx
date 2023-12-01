import React from 'react';
import { useState } from 'react';
import lupa from '../assets/lupa.png';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import axios from 'axios';

const DivSearch = ({ setDataPresent, setDataForecast }) => {
  const urlGetCities = import.meta.env.VITE_URL_GEO;
  const urlGetToday = import.meta.env.VITE_URL_CURRENT_WEATHER;
  const urlGetForecast = import.meta.env.VITE_URL_FORECAST;
  const appid = import.meta.env.VITE_X_API_KEY;

  const [inputBusca, setInputBusca] = useState('');

  let paramsGetCities = {
    q: inputBusca,
    appid,
    limit: 5
  }

  async function chooseCity(cities) {
    const { value } = await Swal.fire({
      title: 'Estas foram as primeiras cidades identificadas pela sua busca:',
      input: 'select',
      inputOptions: Object.fromEntries(cities.map((opcao, index) => [index, ` ${opcao.name}, ${opcao.state}, ${opcao.country}`])),
      inputPlaceholder: 'Selecione uma opção',
      showCancelButton: true,
      inputValidator: (value) => { if (!value) { return 'Por favor, selecione uma opção' } }
    });
    return value
  }

  async function updateData(cidadeEscolhida) {
    try {
      const paramentros = {
        lat: cidadeEscolhida.lat,
        lon: cidadeEscolhida.lon,
        appid
      }
      let dadosHoje = (await axios.get(urlGetToday, { params: paramentros })).data
      let dadosPrevis = (await axios.get(urlGetForecast, { params: paramentros })).data
      setDataPresent(dadosHoje)
      setDataForecast(dadosPrevis)
    } catch (error) {
      Swal.fire({
        title: "Opa!",
        text: "Houve um problema com a fonte de dados externa. Por favor espere um pouco e tente novamente"
      });
      console.log(error)
    }
  }

  async function AlertNoCities() {
    return (Swal.fire({
      title: "Opa!",
      text: "Parece que sua busca não retornou cidades. \n Verifique o seu input e tente novamente",
    }))
  }

  async function AlertNoCities() {
    return (Swal.fire({
      title: "Opa!",
      text: "Parece que sua busca não retornou cidades. \n Verifique o seu input e tente novamente"
    }))
  }
  
  async function AlertExternalError() {
    return (Swal.fire({
      title: "Opa!",
      text: "Houve um problema com os dados externos. Tente novamente mais tarde."
    }))
  }

  async function handleSubmit(e) {
    if (e.key === 'Enter') {
      try {
        let cities = (await axios.get(urlGetCities, { params: paramsGetCities })).data
        if (cities.length === 0) { return AlertNoCities() }

        const value = await chooseCity(cities);

        await updateData(cities[value]);
      } catch (error) {
        await AlertExternalError();
        console.log(error)
      }
    }
  };

  return (
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
        autoFocus
        value={inputBusca}
        onChange={(e) => setInputBusca(e.target.value)}
        onKeyUp={handleSubmit}
      />
    </DivBusca>
  );
};

export default DivSearch;

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