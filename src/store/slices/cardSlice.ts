import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface WeatherState {
  cities: City[],
  selectedCity: City | null,
  status: 'idle' | 'loading' | 'failed'
}

 export interface City {
    id: string,
    name: string,
    temperature: string,
    localTime: string,
}

const initialState: WeatherState = {
    cities: [{
        id: '1',
        name: 'jorg',
        temperature: '27',
        localTime: '13',
    }],
    selectedCity: null,
    status: 'idle'
}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<City>) => {
        state.cities.push(action.payload)
    },
    deleteCity:(state, action: PayloadAction<string>) => {
        state.cities = state.cities.filter(city => city.id !== action.payload)
    },
    setSelectedCity:(state, action: PayloadAction<City>) => {
        state.selectedCity = action.payload
    },
  },
})


export const selectCities = (state: RootState) => state.weather.cities
export const selectSelectedCity = (state: RootState) => state.weather.selectedCity
export const { addCity, deleteCity, setSelectedCity} = weatherSlice.actions
export default weatherSlice.reducer