import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { StompSessionProvider } from 'react-stomp-hooks';

const container = document.getElementById('root')!;
const root = createRoot(container);
console.log(window.location.origin)
console.log("DONT READ", process.env.REACT_APP_GOOGLE_CLIENT_ID)
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}>
      <DndProvider backend={HTML5Backend}>
        <StompSessionProvider url='http://localhost:8080/batalla-naval'>
          <App />
        </StompSessionProvider>
      </DndProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
