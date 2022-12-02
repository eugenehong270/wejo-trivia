import React from "react";
import { useGetUserGamesQuery } from "../store/api";
import './Board.css';


function GamesList() {
    // const { data, error, isLoading } = useGetGamesQuery();
    const { data, isLoading } = useGetUserGamesQuery();
    const handleClick = (e) => {
        console.log(e.target)
    };
    if (isLoading) {
        return (
            <progress className="progress is-primary" max="100"></progress>
        );
    } else {
        return (
            <div className="board">
                <h1 className='leaderboard'>Leaderboard</h1>
                <div className="column is-narrow">
                    <div className="duration">
                        <button onClick={handleClick} data-id="7">7Days</button>
                        <button onClick={handleClick} data-id="30">30Days</button>
                        <button onClick={handleClick} data-id="0">All-Time</button>
                    </div>
                    <table className="table is-striped">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Category</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.games.map(game => (
                                <tr key={game.id}>
                                    <td>{game.date}</td>
                                    <td>{game.category}</td>
                                    <td>{game.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }


};

export default GamesList;