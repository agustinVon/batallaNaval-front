import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import "./matchTableStyle.scss"
import { faBullseye } from '@fortawesome/free-solid-svg-icons';

type MatchData = {
    result:boolean,
    opponent:string
}

type Props = {
    matchData?: MatchData[]
}

const MatchesTable = ({matchData}: Props) => {
  return (
    <table>
        <tr>
            <th style={{width: 220}}>Time</th>
            <th style={{width: 150}}>Result</th>
            <th style={{flex: 1}}>Opponent</th>
        </tr>
        <tbody>
            {matchData && matchData?.length > 0 
                ? matchData.map(data => (
                <tr>
                    <td style={{width: 220}}>{"2022-07-21"}</td>
                    <td style={{width: 150}}>{data.result ? "Victory" : "Defeat"}</td>
                    <td style={{flex: 1}}>{data.opponent}</td>
                </tr>
                ))
                : <div className='noGamesPlaceholder'>
                    <FontAwesomeIcon size='4x' icon={faBullseye} color={'#555555'}></FontAwesomeIcon>
                    <label>No games played yet</label>
                </div>
            }
        </tbody>
    </table>
  )
}

export default MatchesTable