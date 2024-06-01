import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import axios from 'axios'

interface WeatherState {
  cities: City[],
  selectedCity: City | null,
  status: 'idle' | 'loading' | 'failed' | 'succeeded',
  error: null | string
}

 export interface City {
    id: string,
    name: string,
    temperature: string,
    localTime: string,
}

const initialState: WeatherState = {
  cities: [],
  selectedCity: null,
  status: 'idle',
  error: null
}

export const fetchCity = createAsyncThunk<City, string>('city/fetchCity', async (cityName, { rejectWithValue }) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9f00e8da1bfae015ad968986513086bf&units=metric`);
    const cityData = response.data;
    
    const timeResponse = await fetch('http://worldtimeapi.org/api/timezone/Europe/London');
    if (!timeResponse.ok) {
      throw new Error(`HTTP error! status: ${timeResponse.status}`);
    }
    const timeData = await timeResponse.json();
    const utcTime = new Date(timeData.utc_datetime).getTime();
    const localTimeInMillis = utcTime + (cityData.timezone * 1000);
    const localTime = new Date(localTimeInMillis);
    const hours = ('0' + localTime.getUTCHours()).slice(-2);
    const minutes = ('0' + localTime.getUTCMinutes()).slice(-2);
    const result = `${hours}:${minutes}`;
    const newCity = {
      id: cityData.id.toString(),
      name: cityData.name,
      temperature: Math.floor(Number(cityData.main.temp)).toString(),
      localTime: result
    };
    return newCity;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    deleteCity:(state, action: PayloadAction<string>) => {
        state.cities = state.cities.filter(city => city.id !== action.payload)
    },
    setSelectedCity:(state, action: PayloadAction<City>) => {
        state.selectedCity = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCity.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCity.fulfilled, (state, action: PayloadAction<City>) => {
        state.status = 'succeeded'
        state.cities.push(action.payload)
      })
      .addCase(fetchCity.rejected, (state, action) => {
        state.status = 'failed'
        state.cities = []
        state.error = action.error as string
      })
  },})


export const selectCities = (state: RootState) => state.weather.cities
export const selectSelectedCity = (state: RootState) => state.weather.selectedCity
export const { deleteCity, setSelectedCity} = weatherSlice.actions
export default weatherSlice.reducer