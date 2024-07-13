import React from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD:frontend/index.js
import App from './Components/A.App';
=======
import { Provider } from 'react-redux';
import store from './store';
import App from './Components.A.App';
import './Styling/index.css';
>>>>>>> aff44c4b56700146fabb9cb11e98843279ccf818:frontend/index.jsx
import reportWebVitals from './reportWebVitals';


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
<<<<<<< HEAD:frontend/index.js
  <App />
=======
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
>>>>>>> aff44c4b56700146fabb9cb11e98843279ccf818:frontend/index.jsx
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. 
//reportWebVitals();
