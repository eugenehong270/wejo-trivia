import React from "react";
import { useGetUserGamesQuery } from "../store/api";
import "../style/leaderboard.css"





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
                <div className="header">
                    <h1>Leaderboard</h1>
                </div>
                <div className="main">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Date</th>
                                <th scope="col">Category</th>
                                <th scope="col">Points</th>
                            </tr>
                        </thead>
                        <tbody>
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
                </div>
            </>
        )
    }


};

export default GamesList;
