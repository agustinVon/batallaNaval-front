import React, { useEffect } from 'react'
import './loginStyles.scss'
import '../commons/buttonStyle.scss'
import { Navbar } from '../commons/Navbar'
import {CommonButton, DropdownButton} from '../commons/Button'
import { useNavigate } from "react-router-dom";
import { CredentialResponse, useGoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google'
import Wave from 'react-wavify'
import battleship from '../../resources/battleship.svg'

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
      <div className='loginBackground'>
        <div className='topLoginBackground'/>
        <div className='wave'>
          <Wave fill='#393939'
            paused={false}
            options={{
              height:20,
              amplitude: 22,
              speed: 0.2,
              points: 3
            }}
          />
        </div>
        <div className='bottomBackground'/>
        <img src={battleship} className='backgroundImage'/>
      </div>
      <div className='loginContent'>
        <h1>BATTLESHIPS</h1>
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