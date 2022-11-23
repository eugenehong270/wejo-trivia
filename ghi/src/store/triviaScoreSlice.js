import { createSlice } from "@reduxjs/toolkit";

// Figure out what shape we need
const initialState = [
  { category: '', difficulty: '', points: 0 },
]

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        updateScore(state, action) {
            const
        }
    }
})
