import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './B.Homepage';
// import CoinPage from './D.CoinPage';
import Graph from './Graph/Graph';
import PreviewCard from './C.PreviewCard';
import CoinPage from './D.CoinPage';

const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/graph" element={<Graph />} />
                    {/* <Route path="/" element={<CoinPage />} /> */}
                </Routes>
            </Router>
        </div>
    );
};

export default App;