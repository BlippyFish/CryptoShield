import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>CryptoShield</p>
        <p className="App-link">
          Powered by <a href="https://tokeninsight.com/en/products/api" target="_blank" rel="noopener noreferrer">TokenInsight API</a>
        </p>
      </header>
    </div>
  );
}

export default App;
