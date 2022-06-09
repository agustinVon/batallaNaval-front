import './homeStyles.scss'
import { Navbar } from '../commons/Navbar'
import { useAuth0 } from "@auth0/auth0-react";
import { CommonButton } from '../commons/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faShip } from '@fortawesome/free-solid-svg-icons';
import { useGetAuth0Token } from '../../utils/hooks';
import { getProfileData } from '../../utils/api';

export const Home = () => {
  const navigate = useNavigate()
  const { user } = useAuth0();
  const { token, error } = useGetAuth0Token()
  const [loading, setLoading] = useState(true)
  const [profileData, setProfileData] = useState<any>()
  
  useEffect(() => {
    if (token && !profileData) getProfileData(token).then(data => {
      setProfileData(data)
      setLoading(false)
    })
  },[token, profileData])

  return (
    <div className='homePage'>
      <Navbar/>
      <div className='homeBackground'>
        <h2>Welcome back {user?.nickname}</h2>
        <div>
          <div className='horizontalContainer' style={{width: 500}}>
            <h3>Last matches played</h3>
            <div className='bar'></div>
          </div>
          <ul>
            <li>Victory 02/03/2022 - 16:30 with Agustin</li>
            <li>Victory 02/03/2022 - 16:30 with Agustin</li>
            <li>Victory 02/03/2022 - 16:30 with Agustin</li>
          </ul>
        </div>
        <div className='horizontalContainer'>
          <div className='statWrapper'>
            <FontAwesomeIcon size='4x' icon={faTrophy} color={'#276b26'}></FontAwesomeIcon>
            <label>Win ratio: 0,5</label>
          </div>
          <div className='statWrapper'>
            <FontAwesomeIcon size='4x' icon={faShip} color={'#276b26'}></FontAwesomeIcon>
            <label>Win ratio: 0,5</label>
          </div>
        </div>
        <div className='horizontalContainer'>
          <CommonButton className='mediumButton' onClick={() => navigate('/game')} text='Join game' />
        </div>
      </div>
    </div>
  )
}