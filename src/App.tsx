import React from 'react';
import { Root } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './components/login';
import './App.scss'
interface AppProps {
  root: Root
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
