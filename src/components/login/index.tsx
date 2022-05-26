import React from 'react'
import { GoogleLoginButton } from './GoogleLoginButton'
import './loginStyles.scss'
import { Navbar } from '../commons/Navbar'
import {CommonButton, DropdownButton} from '../commons/Button'
import { useAuth0 } from "@auth0/auth0-react";

export const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className='loginPage'>
      <Navbar/>
      <div className='loginBackground'>
        <h1>Battleships</h1>
        <div >
          <CommonButton text={"Register"} width={300} onClick={() => {}}/>
          <CommonButton text={"Login"} width={300} onClick={() => loginWithRedirect}/>
        </div>
      </div>
    </div>
  )
}