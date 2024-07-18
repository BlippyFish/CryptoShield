import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './B.Homepage';
// import CoinPage from './D.CoinPage';
import Graph from './Graph/Graph';

const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/graph" element={<Graph />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;