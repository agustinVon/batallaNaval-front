import React from 'react'
import "./matchTableStyle.scss"

type MatchData = {
    time:string,
    result:boolean,
    oponent:string
}

type Props = {
    matchData: MatchData[]
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
            {matchData.map(data => (
                <tr>
                    <td style={{width: 220}}>{data.time}</td>
                    <td style={{width: 150}}>{data.result ? "Victory" : "Defeat"}</td>
                    <td style={{flex: 1}}>{data.oponent}</td>
                </tr>
            ))}
        </tbody>
    </table>
  )
}

export default MatchesTable