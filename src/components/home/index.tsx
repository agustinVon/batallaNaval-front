import './homeStyles.scss'
import { Navbar } from '../commons/Navbar'
import { CommonButton } from '../commons/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faShip } from '@fortawesome/free-solid-svg-icons';
import { joinNewGame, getProfileData } from '../../utils/api';

interface ProfileData {
  email: string,
  games: [],
  id: string,
  name:string,
  streak: number,
  surname: string,
  winRate: number
}

export const Home = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [profileData, setProfileData] = useState<ProfileData>()
  const [userId, setUserId] = useState<String>("")
  
  useEffect(() => {
    if (!profileData) getProfileData("").then(data => {
      data.json().then(json =>{
        setProfileData(json)
        setUserId(json.id)
        localStorage.setItem('userId', `${json.id}`)
      })
      setLoading(false)
    })
  },[profileData])

  const onGameJoin = () => {
    joinNewGame(userId).then(data => {
      if(data.status === 200) {
        data.text().then(url => navigate(url))
      }
    })
  }

  return (
    <div className='homePage'>
      <Navbar/>
      <div className='homeBackground'>
        {loading 
        ? <h3>Loading</h3>
        : <>
        <h2>Welcome back {profileData?.name}</h2>
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
          <CommonButton className='mediumButton' onClick={onGameJoin} text='Join game' />
        </div>
        </>
        }
      </div>
    </div>
  )
}