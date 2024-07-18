import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
import testData from './testData.json';

const Graph = () => {
    const [data, setData] = useState([]);
    const [scatterData, setScatterData] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const coinId = 'bitcoin';
                const interval = 'day';
                const length = '7'
                const response = await axios.get(`api/historyCoin/${coinId}?interval=${interval}&length=${length}`);
                // const response = testData; // uncomment this line to use test data
                setName(response.data.name);
                const chartData = response.data.market_chart.map(item => ({
                    timestamp: new Date(item.timestamp).toLocaleString(),
                    price: item.price,
                    volume: item.vol_spot_24h
                }));

                const priceVolume = {
                    x: chartData.map(item => item.timestamp),
                    y: chartData.map(item => item.price),
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Price',
                    yaxis: 'y1'
                };

                const volume = {
                    x: chartData.map(item => item.timestamp),
                    y: chartData.map(item => item.volume),
                    type: 'bar',
                    name: 'Volume',
                    yaxis: 'y2'
                };

                const scatter = {
                    x: chartData.map(item => item.price),
                    y: chartData.map(item => item.volume),
                    mode: 'markers',
                    type: 'scatter',
                    name: 'Price vs Volume'
                };

                setData([priceVolume, volume]);
                setScatterData([scatter]);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>{name} Price and Volume Over Time</h2>
            <Plot
                data={data}
                layout={{
                    title: `${name} Price and Volume Over Time`,
                    xaxis: { title: 'Time' },
                    yaxis: { title: 'Price', side: 'left' },
                    yaxis2: {
                        title: 'Volume',
                        overlaying: 'y',
                        side: 'right'
                    },
                    barmode: 'group'
                }}
                style={{ width: '100%', height: '400px' }}
            />
            <h2>Scatter Plot of {name} Price vs Volume</h2>
            <Plot
                data={scatterData}
                layout={{
                    title: `Scatter Plot of ${name} Price vs Volume`,
                    xaxis: { title: 'Price' },
                    yaxis: { title: 'Volume' }
                }}
                style={{ width: '100%', height: '400px' }}
            />
        </div>
    );
};

export default Graph;