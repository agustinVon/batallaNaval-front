import React from 'react'
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'

const clientId = "clientId"

export const GoogleLoginButton = () => {
  const onSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log('Login success')
  }

  const onFailure = (res: GoogleLoginResponse) => {
    console.log('Failed', res)
  }


  return (
    <div>
        <GoogleLogin
        style={{width: 100}}
        clientId={clientId}
        buttonText='Login'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        />
    </div>
  )
}
