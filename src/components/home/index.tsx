import './homeStyles.scss'
import { Navbar } from '../commons/Navbar'
import { useAuth0 } from "@auth0/auth0-react";
import { ChatBox } from '../commons/ChatBox';
import { CommonButton } from '../commons/Button';

export const Home = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className='homePage'>
      <Navbar/>
      <div className='homeBackground'>
        <ChatBox/>
      </div>
    </div>
  )
}