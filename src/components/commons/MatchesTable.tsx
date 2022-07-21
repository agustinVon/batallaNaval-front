import React from 'react'
import "./matchTableStyle.scss"

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
            {matchData 
                ? matchData.map(data => (
                <tr>
                    <td style={{width: 220}}>{"2022-07-21"}</td>
                    <td style={{width: 150}}>{data.result ? "Victory" : "Defeat"}</td>
                    <td style={{flex: 1}}>{data.opponent}</td>
                </tr>
                ))
                : <div>
                    <label>No games played yet</label>
                </div>
            }
        </tbody>
    </table>
  )
}

export default MatchesTable