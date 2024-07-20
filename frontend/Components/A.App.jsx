import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './B.Homepage';
import CoinPage from './D.CoinPage';
import Coin from './E.Coin';
import Graph from './G.Graph.jsx';
const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/graph" element={<Graph />} />
                    {/* Modify the route to accept coinId as a URL parameter */}
                    <Route path="/coinpage/:coinId" element={<CoinPage />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;