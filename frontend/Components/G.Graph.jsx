import React, { useEffect, useState } from 'react'; // Import React and hooks (useEffect and useState)
import Plot from 'react-plotly.js'; // Import Plot component from react-plotly.js
import axios from 'axios'; // Import axios for making HTTP requests
import styled from 'styled-components'; // Import styled-components for styling

// Styled components
const Container = styled.div`
  background-color: #0f1c3f;
  min-height: 100vh;
  color: white;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Dropdown = styled.select`
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const PlotContainer = styled.div`
  margin: 20px 0;
`;

const HighLowVolumeContainer = styled.div`
  margin-top: 20px;
`;

const Graph = ({ coinId }) => { // Define Graph component, accepting coinId as a prop
    const [data, setData] = useState([]); // State to store the data for the combined line and bar chart
    const [scatterData, setScatterData] = useState([]); // State to store the data for the scatter plot
    const [candlestickData, setCandlestickData] = useState([]); // State to store the data for the candlestick chart
    const [name, setName] = useState(''); // State to store the name of the coin
    const [intervalLength, setIntervalLength] = useState({ label: '1 Day', interval: 'hour', length: 24 }); // State to store the selected interval and length

    // Array of options for the interval and length dropdown menu
    const intervalOptions = [
        { label: '1 Day', interval: 'hour', length: 24 },
        { label: '5 Day', interval: 'hour', length: 120 },
        { label: '30 Day', interval: 'day', length: 30 },
        { label: '90 Day', interval: 'day', length: 90 },
        { label: '1 Year', interval: 'day', length: 365 },
        { label: 'Year to Date', interval: 'day', length: 'ytd' }, // Year to Date
        { label: 'Max', interval: 'day', length: -1 }, // Max (entire history)
    ];

    // useEffect to fetch data whenever coinId or intervalLength changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                // const coinId = `bitcoin`
                const { interval, length } = intervalLength; // Destructure interval and length from state

                // Determine the length for 'ytd' option
                let actualLength = length;
                if (length === 'ytd') {
                    const startOfYear = new Date(new Date().getFullYear(), 0, 1);
                    actualLength = Math.ceil((new Date() - startOfYear) / (1000 * 60 * 60 * 24));
                }

                const response = await axios.get(`/api/historyCoin/${coinId}?interval=${interval}&length=${actualLength}`);
                // const response = testData; // Uncomment this line to use test data instead

                setName(response.data.name); // Set the coin name

                // Map the response data to chartData format
                const chartData = response.data.market_chart.map(item => ({
                    timestamp: new Date(item.timestamp).toISOString(), // Convert timestamp to ISO string for better Plotly compatibility
                    price: item.price,
                    volume: item.vol_spot_24h
                }));

                // Group data by calendar day
                const groupedData = chartData.reduce((acc, item) => {
                    const date = item.timestamp.split('T')[0]; // Extract the date part
                    if (!acc[date]) acc[date] = [];
                    acc[date].push(item);
                    return acc;
                }, {});

                // Calculate high, low, open, and close for each day
                const candlestickData = Object.keys(groupedData).map(date => {
                    const dayData = groupedData[date];
                    return {
                        timestamp: date,
                        open: dayData[0].price,
                        high: Math.max(...dayData.map(item => item.price)),
                        low: Math.min(...dayData.map(item => item.price)),
                        close: dayData[dayData.length - 1].price,
                        volume: dayData.reduce((sum, item) => sum + item.volume, 0)
                    };
                });

                // Create the price line data for the line chart
                const priceVolume = {
                    x: chartData.map(item => item.timestamp), // X-axis data (timestamps)
                    y: chartData.map(item => item.price), // Y-axis data (prices)
                    type: 'scatter', // Type of plot
                    mode: 'lines', // Line plot
                    name: 'Price', // Legend name
                    yaxis: 'y1' // Use the first Y-axis
                };

                // Create the volume bar data for the bar chart
                const volume = {
                    x: chartData.map(item => item.timestamp), // X-axis data (timestamps)
                    y: chartData.map(item => item.volume), // Y-axis data (volumes)
                    type: 'bar', // Type of plot
                    name: 'Volume', // Legend name
                    yaxis: 'y2', // Use the second Y-axis
                    marker: { color: 'rgba(99, 110, 250, 0.5)' } // Adjust color if needed
                };

                // Create the data for the scatter plot of price vs volume
                const scatter = {
                    x: chartData.map(item => item.price), // X-axis data (prices)
                    y: chartData.map(item => item.volume), // Y-axis data (volumes)
                    mode: 'markers', // Scatter plot
                    type: 'scatter', // Type of plot
                    name: 'Price vs Volume' // Legend name
                };

                // Create the candlestick data
                const candlestick = {
                    x: candlestickData.map(item => item.timestamp),
                    open: candlestickData.map(item => item.open),
                    high: candlestickData.map(item => item.high),
                    low: candlestickData.map(item => item.low),
                    close: candlestickData.map(item => item.close),
                    type: 'candlestick',
                    name: 'Candlestick'
                };

                setData([volume, priceVolume]); // Set the volume first and price line second to render price line over volume bars
                setScatterData([scatter]); // Set the data for the scatter plot
                setCandlestickData([candlestick]); // Set the data for the candlestick chart
            } catch (error) {
                console.error('Error fetching data', error); // Log any errors
            }
        };
        fetchData(); // Fetch data on component mount and when dependencies change
    }, [coinId, intervalLength]); // Dependencies for useEffect

    // Handle interval change from the dropdown menu
    const handleIntervalChange = (event) => {
        const selectedOption = intervalOptions.find(option => option.label === event.target.value);
        setIntervalLength(selectedOption);
    };


    //`${Number(volume.toFixed(2)).toLocaleString('en-US')}`

    // Render high, low, and volume for 1 day/hour chart
    const renderHighLowVolume = () => {
        const prices = data[1]?.y; // Update to get prices from the priceVolume data
        const volumes = data[0]?.y; // Update to get volumes from the volume data
        if (!prices || !volumes) return null;
        const high = Math.max(...prices);
        const low = Math.min(...prices);
        const volume = volumes.reduce((acc, val) => acc + val, 0);
        return (
            <HighLowVolumeContainer>
                <p><strong>High:</strong> {`$${Number(high.toFixed(2)).toLocaleString('en-US')}`}</p>
                <p><strong>Low:</strong> {`$${Number(low.toFixed(2)).toLocaleString('en-US')}`}</p>
                <p><strong>Volume:</strong> {`$${Number(volume.toFixed(2)).toLocaleString('en-US')}`}</p>
            </HighLowVolumeContainer>
        );
    };

    // Helper function to get the date for the 1-day chart
    const getDateFromData = () => {
        if (data.length > 0 && data[1]?.x.length > 0) {
            const firstTimestamp = data[1].x[0];
            return new Date(firstTimestamp).toLocaleDateString();
        }
        return '';
    };

    return (
        <Container>
            <Title>{name} Price and Volume</Title> {/* Dynamic title */}
            <Dropdown onChange={handleIntervalChange}> {/* Dropdown for interval/length selection */}
                {intervalOptions.map(option => (
                    <option key={option.label} value={option.label}>
                        {option.label}
                    </option>

                ))}
                           
            </Dropdown>
            {intervalLength.length === 24 && intervalLength.interval === 'hour' ? (
                <PlotContainer>
                    <Plot
                        data={[data[1]]} // Only plot the price line for 1 day/hour
                        layout={{
                            title: `${name} 1 Day Price by Hour (${getDateFromData()})`,
                            xaxis: { title: 'Time', tickformat: '%H:%M', color: 'white' }, // Format x-axis to show only hour and minute
                            yaxis: { title: 'Price', color: 'white' },
                            plot_bgcolor: '#0f1c3f',
                            paper_bgcolor: '#0f1c3f',
                            font: {
                                color: 'white'
                            }
                        }}
                        style={{ width: '100%', height: '400px' }}
                    />
                    {renderHighLowVolume()}
                </PlotContainer>
            ) : (
                <>
                    <PlotContainer>
                        <Plot
                            data={data}
                            layout={{
                                title: `${intervalLength.label} Price and Volume`,
                                xaxis: { title: 'Time', color: 'white' },
                                yaxis: { title: 'Price', side: 'left', color: 'white' },
                                yaxis2: {
                                    title: 'Volume',
                                    overlaying: 'y',
                                    side: 'right',
                                    showgrid: false,
                                    zeroline: false,
                                    showline: false,
                                    ticks: '',
                                    tickfont: { color: 'rgba(0,0,0,0)' },
                                    rangemode: 'tozero',
                                    range: [0, Math.max(...data[0]?.y || []) * 2], // Double the max value of volume
                                    color: 'white'
                                },
                                barmode: 'group',
                                plot_bgcolor: '#0f1c3f',
                                paper_bgcolor: '#0f1c3f',
                                font: {
                                    color: 'white'
                                }
                            }}
                            style={{ width: '100%', height: '400px' }}
                        />
                    </PlotContainer>
                    <PlotContainer>
                        <h2>{name} Price vs Volume</h2>
                        <Plot
                            data={scatterData}
                            layout={{
                                title: `${intervalLength.label} Price x Volume Scatter`,
                                xaxis: { title: 'Price', color: 'white' },
                                yaxis: { title: 'Volume', color: 'white' },
                                plot_bgcolor: '#0f1c3f',
                                paper_bgcolor: '#0f1c3f',
                                font: {
                                    color: 'white'
                                }
                            }}
                            style={{ width: '100%', height: '400px' }}
                        />
                    </PlotContainer>
                    <PlotContainer>
                        <h2>{name} Price Candlestick</h2>
                        <Plot
                            data={candlestickData} // Plot the candlestick chart
                            layout={{
                                title: `${intervalLength.label} Price Candlestick`,
                                xaxis: { title: 'Time', color: 'white' },
                                yaxis: { title: 'Price', color: 'white' },
                                plot_bgcolor: '#0f1c3f',
                                paper_bgcolor: '#0f1c3f',
                                font: {
                                    color: 'white'
                                }
                            }}
                            style={{ width: '100%', height: '400px' }}
                        />
                    </PlotContainer>
                </>
            )}
        </Container>
    );
};

export default Graph; // Export the component
