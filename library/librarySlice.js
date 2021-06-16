import { createSlice } from "@reduxjs/toolkit";

export const librarySlice = createSlice({
    name: "library",
    initialState: [
        {
            name: "cat mew",
            type: "freesound",
            url: "https://freesound.org/data/previews/70/70751_323867-hq.mp3",
            crop: [2.3, 1],
            id: 1,
        },
        {
            name: "dog mew",
            type: "freesound",
            url: "https://freesound.org/data/previews/1/1234_600-hq.mp3",
            crop: [1.3, 2],
            id: 2,
        },

    ],
    reducers: {
        addSample: (state, action) => {
            return [
                ...state,
                {
                    name: action.payload.name,
                    type: action.payload.type,
                    url: action.payload.url,
                    crop: undefined,
                    id: state[state.length - 1].id + 1,
                },
            ];
        },
        removeSample: (state, action) => {
           // return state.filter((item) => item !== action.payload.id + 1);
            return state.filter((item) => item.id !== action.payload);
        },

        editSample: (state, action) => {
            // action.payload {id: 23, object: {name: "cat mewmew", crop: [1.2, 3]}}
            return state.map((item) =>
                item.id === action.payload.id
                    ? { ...item, ...action.payload.object }
                    : item
            );
        },
    },
});

export const { addSample, removeSample, editSample } = librarySlice.actions;
export default librarySlice.reducer;
export const librarySelector = (state) => state.library;
