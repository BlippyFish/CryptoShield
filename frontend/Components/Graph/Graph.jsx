import React, { useEffect, useState } from 'react'; // Import React and hooks (useEffect and useState)
import Plot from 'react-plotly.js'; // Import Plot component from react-plotly.js
import axios from 'axios'; // Import axios for making HTTP requests
import testData from './testData.json'; // Import test data (can be removed when using actual data)
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
    const [name, setName] = useState(''); // State to store the name of the coin
    const [intervalLength, setIntervalLength] = useState({ interval: 'hour', length: 24 }); // State to store the selected interval and length

    // Array of options for the interval and length dropdown menu
    const intervalOptions = [
        { label: '24 hours', interval: 'hour', length: 24 },
        { label: '5 days', interval: 'hour', length: 120 },
        { label: '30 days', interval: 'day', length: 30 },
        { label: '90 days', interval: 'day', length: 90 },
        { label: '1 year', interval: 'day', length: 365 },
    ];

    // useEffect to fetch data whenever coinId or intervalLength changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const coinId = `bitcoin`
                const { interval, length } = intervalLength; // Destructure interval and length from state
                const response = await axios.get(`/api/historyCoin/${coinId}?interval=${interval}&length=${length}`);
                // const response = testData; // Uncomment this line to use test data instead

                setName(response.data.name); // Set the coin name

                // Map the response data to chartData format
                const chartData = response.data.market_chart.map(item => ({
                    timestamp: new Date(item.timestamp).toLocaleString(), // Convert timestamp to a readable date string
                    price: item.price,
                    volume: item.vol_spot_24h
                }));

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

                setData([volume, priceVolume]); // Set the volume first and price line second to render price line over volume bars
                setScatterData([scatter]); // Set the data for the scatter plot
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
                <p>High: {high}</p>
                <p>Low: {low}</p>
                <p>Volume: {volume}</p>
            </HighLowVolumeContainer>
        );
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
                            title: `${name} Price Over Time (1 day/hr)`,
                            xaxis: { title: 'Time' },
                            yaxis: { title: 'Price' },
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
                                title: `${name} Price and Volume`,
                                xaxis: { title: 'Time' },
                                yaxis: { title: 'Price', side: 'left' },
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
                                    range: [0, Math.max(...data[0]?.y || []) * 2] // Double the max value of volume
                                },
                                barmode: 'group'
                            }}
                            style={{ width: '100%', height: '400px' }}
                        />
                    </PlotContainer>
                    <PlotContainer>
                        <h2>{name} Price vs Volume</h2>
                        <Plot
                            data={scatterData}
                            layout={{
                                title: `${name} Price vs Volume`,
                                xaxis: { title: 'Price' },
                                yaxis: { title: 'Volume' }
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
