import React from 'react'
import { useGetTokenQuery, useGetUserGamesQuery, useGetUserStatsQuery } from "../store/api";
import LoginModal from './LoginModal';
import '../style/profile.css'

const UserProfile = () => {
    const { data: tokenData } = useGetTokenQuery();
    const { data } = useGetUserGamesQuery();
    const { data: stats } = useGetUserStatsQuery();

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
                <div  >
                    <div>
                        <h2 className='profile-stats'>Profile Stats</h2>
                    </div>
                    <div className='profile-main'>
                        <table>
                            <thead>
                                <tr>
                                    <th scope='col'>Highest score</th>
                                    <th scope='col'>Average Score</th>
                                    <th scope='col'>Total Games</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={stats?.id}>
                                    <td>{stats?.highest_score}</td>
                                    <td>{stats?.avg_score}</td>
                                    <td>{stats?.total_games}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>

                </div>

                <div >
                    <div>
                        <h2 className='game-history'>Game History </h2>
                    </div>
                    <div className='profile-main'>
                        <table>
                            <thead>
                                <tr>
                                    <th scope='col'>Date</th>
                                    <th scope='col'>Category</th>
                                    <th scope='col'>Difficulty</th>
                                    <th scope='col'>Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.games.map(game => (
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
            </>
        )
    }
}

export default UserProfile
