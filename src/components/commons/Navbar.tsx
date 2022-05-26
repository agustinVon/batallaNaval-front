import React from 'react'
import './navbarStyle.scss'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CommonButton } from './Button'
import { useAuth0 } from '@auth0/auth0-react'

export const Navbar = () => {
  const { isAuthenticated, logout} = useAuth0()
  return (
    <nav>
      {isAuthenticated && <CommonButton text='Logout' width={80} className='navButton' onClick={logout}/>}
    </nav>
  )
}
