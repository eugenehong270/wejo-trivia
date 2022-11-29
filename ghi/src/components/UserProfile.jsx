import React from 'react'
import { useGetTokenQuery, useGetUserGamesQuery } from "../store/api";
import Notification from './Notification';
import { Link } from 'react-router-dom';

const UserProfile = () => {
    const { data: tokenData } = useGetTokenQuery();
    const { data, error } = useGetUserGamesQuery();

    console.log(tokenData);

    if (!tokenData) {
        return (
            <div className="container">
                <Notification type="info">Must log in to see profile!...</Notification>
            </div>
        )
    } else {
        return (
            <div className="columns is-centered">
                <div className="column is-narrow">
                    <table className="table is-striped">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Category</th>
                                <th>Difficulty</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.games.map(game => (
                                <tr key={game.id}>
                                    <td>{game.date}</td>
                                    <td>{game.category}</td>
                                    <td>{game.difficulty}</td>
                                    <td>{game.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default UserProfile
