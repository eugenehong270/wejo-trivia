import React from 'react';
import Profiles from './Profiles';
import './Board.css';

export default function Board() {

    const handleClick = (e) => {
        console.log(e.target)
    };
    return (
        <div className="board">
            <h1 className='leaderboard'>Leaderboard</h1>

            <div className="duration">
                <button onClick={handleClick} data-id="7">7Days</button>
                <button onClick={handleClick} data-id="30">30Days</button>
                <button onClick={handleClick} data-id="0">All-Time</button>
            </div>

            <Profiles></Profiles>
        </div>
    )
}
