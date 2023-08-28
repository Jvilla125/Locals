import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
    loading: false,
    error: null,
};


const repoReducer = createSlice({
    name: "repos",
    initialState,
    reducers: {
        // starts the api call
        fetchDataStart: (state) => {    
            state.loading = true;
            state.error = null;
        },
        fetchDataSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },
        fetchDataFailure: (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        },
    },
});


export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
    repoReducer.actions;
export default repoReducer.reducer;