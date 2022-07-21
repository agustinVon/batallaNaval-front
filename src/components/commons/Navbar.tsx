import './navbarStyle.scss'
import { CommonButton } from './Button'
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import Wave from 'react-wavify';

export const Navbar = () => {
  const navigate = useNavigate()
  const onLogout = () => {
    googleLogout()
    navigate('/')
  }
  return (
    <nav>
      {<CommonButton text='Logout' width={80} className='navButton' onClick={onLogout}/>}
    </nav>
  )
}
