import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Brush, ResponsiveContainer } from 'recharts';

const Chart = ({ data }) => {
    // Mapeando dt no eixo x e main.temp no eixo y
    const chartData = data.map(item => ({
        dt: new Date(item.dt * 1000), // Convertendo timestamp para uma data JS
        temp: item.main.temp,
    }));

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <XAxis dataKey="dt" />
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Tooltip />
                <Line type="monotone" dataKey="temp" stroke="#8884d8" />
                <Brush dataKey="dt" height={30} stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default Chart;
