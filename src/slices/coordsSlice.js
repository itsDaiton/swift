import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  origin: null,
  destination: null,
  distance: null
}

export const coordsSlice = createSlice({
  name: 'coords',
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload
    },
    setDestination: (state, action) => {
      state.destination = action.payload
    },
    setDistance: (state, action) => {
      state.distance = action.payload
    }
  } 
})

export const { setOrigin, setDestination, setDistance } = coordsSlice.actions

export const selectOrigin = (state) => state.coords.origin
export const selectDestination = (state) => state.nav.destination
export const selectDistance = (state) => state.nav.distance

export default coordsSlice.reducer