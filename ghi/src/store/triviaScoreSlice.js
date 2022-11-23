import { createSlice } from "@reduxjs/toolkit";

// Figure out what shape we need
const initialState = [
  { category: '', difficulty: '', points: 0 },
]

export const triviaScoreSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        updateScore(state, action) {
            const { gameId, userId } = action.payload
        }
    }
})
