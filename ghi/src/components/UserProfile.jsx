import React from 'react'
import { useDeleteScoreMutation, useGetTokenQuery, useGetUserGamesQuery } from "../store/api";
import LoginModal from './LoginModal';
import '../Frontend/profile.css'

const UserProfile = () => {
    const { data: tokenData } = useGetTokenQuery();
    const { data } = useGetUserGamesQuery();
    const [deleteScore] = useDeleteScoreMutation();

    console.log(tokenData);
    console.log(data);

    if (!tokenData) {
        return (
            <>
                <div style={{ display: 'grid', justifyContent: 'center' }} className="container">
                    <h1 style={{ color: 'white', paddingLeft: '10px', marginTop: '20px' }} className="display-3">Must be logged in to see profile!</h1>
                    <LoginModal />
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="profile-header">
                    <h1>Profile</h1>
                </div>
                <div className="profile-main">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Category</th>
                                <th>Difficulty</th>
                                <th>Points</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.games.map(game => (
                                <tr key={game.id}>
                                    <td>{game.date}</td>
                                    <td>{game.category}</td>
                                    <td>{game.difficulty}</td>
                                    <td>{game.points}</td>
                                    <th><button onClick={() => deleteScore(game.id)}>Delete</button></th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

export default UserProfile
