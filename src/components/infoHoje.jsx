const DataProperty = ({ label, value }) => {
    return (
        <div id='prop'>
            <p>{label}: <br /></p>
            {value}
        </div>
    );
};

const InfoHoje = ({ DataPresent, TempUnit }) => {

    function handleTemperature(temperatura) {
        if (TempUnit === 'C') {
            let temperatureCelsius = (temperatura - 273.15);
            return (temperatureCelsius.toFixed(1) + " °C")
        } else if (TempUnit === 'F') {
            let temperatureFahrenheit = (9 / 5) * (temperatura - 273.15) + 32;
            return temperatureFahrenheit.toFixed(1) + " °F";
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
        <div id='baloons'>
            <DataProperty label="Mínima" value={handleTemperature(DataPresent.main.temp_min)} />
            <DataProperty label="Máxima" value={handleTemperature(DataPresent.main.temp_max)} />
            <DataProperty label="Umidade" value={`${DataPresent.main.humidity}%`} />
            <DataProperty label="Velocidade do vento" value={`${DataPresent.wind.speed} m/s`} />
            <h4>{handleCasaquinho(DataPresent.main.temp)}</h4>
        </div>
    );
};

export default InfoHoje;

