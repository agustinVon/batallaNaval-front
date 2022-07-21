import React, { ReactNode, useEffect } from 'react';
import { Root } from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './components/login';
import { Home } from './components/home';
import './App.scss'
import { Game } from './components/game';
interface AppProps {
  root: Root
}

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<AuthenticatedRoute><Home/></AuthenticatedRoute>}/>
          <Route path='/game/:gameId' element={<AuthenticatedRoute><Game/></AuthenticatedRoute>}/>
        </Routes>
      </BrowserRouter>
  )
}

const AuthenticatedRoute = ({children}:{children:React.ReactNode}) => {
  if(!!localStorage.getItem("credentials")) {
    return <>{children}</>
  } else {
    return <Navigate to={"/"}/>
  }
}

export default App;
