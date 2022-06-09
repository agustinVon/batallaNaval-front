import './navbarStyle.scss'
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
