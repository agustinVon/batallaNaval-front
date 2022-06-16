import './navbarStyle.scss'
import { CommonButton } from './Button'
import { googleLogout } from '@react-oauth/google';

export const Navbar = () => {
  return (
    <nav>
      {<CommonButton text='Logout' width={80} className='navButton' onClick={() => googleLogout()}/>}
    </nav>
  )
}
