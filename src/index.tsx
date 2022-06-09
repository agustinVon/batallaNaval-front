import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const container = document.getElementById('root')!;
const root = createRoot(container);
console.log(window.location.origin)
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-rkrdgtgt.us.auth0.com"
    clientId={`${process.env.REACT_APP_CLIENT_ID}`}
    redirectUri="http://localhost:3000"
    audience='https://batalla-naval.example.com'
    >
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
