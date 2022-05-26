import React from 'react'
import './navbarStyle.scss'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Navbar = () => {
  return (
    <nav>
      <FontAwesomeIcon icon={faUserCircle} color={'#399E37'} size='2x'/>
    </nav>
  )
}
