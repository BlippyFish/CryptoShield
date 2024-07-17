import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './Components/A.App';
import './Styling/index.css';
import reportWebVitals from './reportWebVitals';


const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);

root.render(
  // <Provider store={store}>
  <App />
  // </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. 
//reportWebVitals();
