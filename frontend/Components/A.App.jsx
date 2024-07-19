import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './B.Homepage';
import PreviewCard from './C.PreviewCard';
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
                    <Route path="/coinpage" element={<CoinPage />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;