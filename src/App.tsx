import React, { ReactNode } from 'react';
import { Root } from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './components/login';
import { Home } from './components/home';
import './App.scss'
import { useAuth0 } from '@auth0/auth0-react';
interface AppProps {
  root: Root
}

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={isAuthenticated ? <Home/> : <Navigate to={"/"}/>}/>
        {isLoading && <>loading...</>}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
