import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './B.Homepage';
// import CoinPage from './D.CoinPage';

const App = () => {

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    {/* <Route path="/coin" element={<CoinPage />} /> */}
                </Routes>
            </Router>
        </div>
    );

};

export default App;