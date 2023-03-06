import { configureStore } from "@reduxjs/toolkit";
import coordsReducer from '../src/slices/coordsSlice'

export const store = configureStore({
    reducer: {
        coords: coordsReducer
    }
})