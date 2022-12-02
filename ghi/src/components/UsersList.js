import { useEffect, useState } from "react";
import { useGetUsersQuery } from "../store/leaderboardApi";


function UsersList() {
    const { data, error, isLoading } = useGetUsersQuery();
    if (isLoading) {
        return (
            <progress className="progress is-primary" max="100"></progress>
        );
    }
    return (
        <div>

        </div>
    )

};