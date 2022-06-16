import React, { useEffect } from 'react'
import './loginStyles.scss'
import '../commons/buttonStyle.scss'
import { Navbar } from '../commons/Navbar'
import {CommonButton, DropdownButton} from '../commons/Button'
import { useNavigate } from "react-router-dom";
import { CredentialResponse, useGoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google'

export const Login = () => {
  const navigate = useNavigate()

  const onSuccess = (res:CredentialResponse) => {
    localStorage.setItem("credentials", `${res.credential}`)
    navigate("/home")
  }

  const onFailure = () => {
    console.log("Failure")
  }

  return (
    <div className='loginPage'>
      <Navbar/>
      <div className='loginBackground'>
        <h1>Battleships</h1>
        <div >
          <GoogleLogin
          onSuccess={onSuccess}
          onError={onFailure} 
          useOneTap
          />
        </div>
      </div>
    </div>
  )
}