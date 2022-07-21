import './homeStyles.scss'
import { Navbar } from '../commons/Navbar'
import { CommonButton } from '../commons/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faShip } from '@fortawesome/free-solid-svg-icons';
import { joinNewGame, getProfileData, createNewGame } from '../../utils/api';
import Loading from '../commons/Loading';
import MatchesTable from '../commons/MatchesTable';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Game } from '../game';

type Game = {
  opponent: ProfileData,
  result: string
}
type ProfileData = {
  email: string,
  games: Game[],
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
  const [matchCode, setMatchCode] = useState("")
  
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

  console.log('USERID', userId)

  const onGameJoin = () => {
    joinNewGame(userId).then(data => {
      if(data.status === 200) {
        data.json().then(url => {
          navigate(`/game/${url.gameId}`)
        })
      }
    })
  }

  const onGameCreate = () => {
    createNewGame(userId).then(data => {
      if(data.status === 200) {
        data.json().then(url => {
          navigate(`/game/${url.gameId}`)
        })
      }
    })
  }

  return (
    <div className='homePage'>
      <Navbar/>
      <div className='homeBackground'>
        {loading 
        ? <Loading/>
        : <>
        <h2>Welcome back {profileData?.name}</h2>
        <div className='topHomeContainer'>
          <MatchesTable matchData={profileData?.games?.map(game => ({opponent: game?.opponent?.name, result:game?.result === "LOST" ? false : true}))}/>
          <div className='horizontalContainer' style={{flex: 1, justifyContent:'space-evenly'}}>
            <div className='statWrapper'>
              <label className='bigLabel'>{profileData?.games?.length || 0}</label>
              <label>Total matches won</label>
            </div>
            <div className='statWrapper'>
              <div style={{ height: 120, width: 120, marginBottom: 10 }}>
                <CircularProgressbar value={profileData?.winRate || 0} text={`${profileData ? Math.floor(profileData.winRate*100) : 0}%`} styles={buildStyles({
                  pathColor: "#3cbe3a",
                  textColor: '#3cbe3a',
                  trailColor: '#555555',
                })}/>
              </div>
              <label>Win ratio</label>
            </div>
          </div>
        </div>
        <div className='horizontalContainer'>
          <CommonButton className='mediumButton' width={200} onClick={onGameJoin} text='Join quickgame' />
          <CommonButton className='mediumButton' width={250} onClick={onGameCreate} text='Create empty game' />
        </div>
        <div className='horizontalContainer'>
          <input className='gameCodeInput' onChange={(e) => setMatchCode(e.target.value)}/>
          <CommonButton disabled={matchCode === ""} className='mediumButton' onClick={() => navigate(`/game/${matchCode}`)} text='Join' />
        </div>
        </>
        }
      </div>
    </div>
  )
}