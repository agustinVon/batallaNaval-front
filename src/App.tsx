import React, { ReactNode, useEffect } from 'react';
import { Root } from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './components/login';
import { Home } from './components/home';
import './App.scss'
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { Game } from './components/game';
interface AppProps {
  root: Root
}

function App() {
  const {isLoading, isAuthenticated} = useAuth0();
  const AuthenticatedElement = ({children}:{children:React.ReactNode}) => {
    if(!isLoading && isAuthenticated) return <>{children}</>
    else return <Navigate to={"/"}/>
  }
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<AuthenticatedElement><Home/></AuthenticatedElement>}/>
          <Route path='/game' element={<AuthenticatedElement><Game/></AuthenticatedElement>}/>
          {isLoading && <>loading...</>}
        </Routes>
      </BrowserRouter>
  )
}

export default App;
