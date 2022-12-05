import React from "react";
import { useGetUserGamesQuery } from "../store/api";




function GamesList() {
    // const { data, error, isLoading } = useGetGamesQuery();
    const { data, isLoading } = useGetUserGamesQuery();
    // const handleClick = (e) => {
    //     console.log(e.target)
    // };
    // const between = (data, between) => {
    //     const today = new Date();
    //     const previous = new Date(today);
    //     previous.setDate(previous.getDate() - (between + 1));

    //     let filter = data.filter(val => {
    //         let userDate = new Date(val.date);
    //         return previous <= userDate && today >= userDate;
    //     })

    //     return filter.sort((a, b) => {
    //         if (a.points === b.points) {
    //             return b.points - a.points;
    //         } else {
    //             return b.points - a.points;
    //         };
    //     })
    // };
    if (isLoading) {
        return (
            <progress className="progress is-primary" max="100">Loading</progress>
        );
    } else {
        return (
            <>
                <div className="d-flex justify-content-center">
                    <h1>Leaderboard</h1>
                </div>
                <table>
                    <thead >
                        <tr>
                            {/* <th>#</th> */}
                            <th>Name</th>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody >
                        {/* <tr>
                                <td>Andrew Is The Greatest CSS GURU</td>
                                <td>Andrew Is The Greatest CSS GURU</td>
                                <td>Andrew Is The Greatest CSS GURU</td>
                                <td>Andrew Is The Greatest CSS GURU</td>
                            </tr> */}
                        {data?.games.map(game => (
                            <tr key={game.id}>
                                <td>{game.user.username}</td>
                                <td>{game.date}</td>
                                <td>{game.category}</td>
                                <td>{game.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        )
    }


};

export default GamesList;



{/* <div className="column is-narrow">
                    <div className="duration">
                        <button onClick={handleClick} data-id="7">7 Days</button>
                        <button onClick={handleClick} data-id="30">30 Days</button>
                        <button onClick={handleClick} data-id="0">All-Time</button>
                    </div> */}