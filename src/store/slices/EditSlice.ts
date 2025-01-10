import { createSlice } from "@reduxjs/toolkit";

import { TaskType } from "../../shared/types";


const initialState: {
    task: TaskType | null;
} = {
    task: null
};


export const editeSlice = createSlice({
    name: "edit",
    initialState,
    reducers: {
        editMessage: (state, action) => {
            state.task = action.payload;
        },
        messageEdited: (state, action) => {
            state.task = null;
        }
    }
});


export const { editMessage, messageEdited } = editeSlice.actions;
export default editeSlice.reducer;
export type EditState = typeof initialState;