import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import axios from 'axios';

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
  main: string,
  description: string,
  icon: string,
}

const initialState: WeatherState = {
  cities: [],
  selectedCity: null,
  status: 'idle',
  error: null
}

export const fetchCity = createAsyncThunk('city/fetchCity', async (cityName: string) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9f00e8da1bfae015ad968986513086bf&units=metric&lang=ru`);
    const cityData = response.data;
    console.log(cityData)
    const timeResponse = await fetch('https://worldtimeapi.org/api/timezone/Europe/London');
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
      localTime: result,
      main: cityData.weather[0].main,
      description: cityData.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`,
    };
    console.log(newCity)
    return newCity;
  } catch (err) {
    throw new Error(`HTTP error! status: ${(err as Error).message}`)
  }
});

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    deleteCity: (state, action: PayloadAction<City>) => {
      state.cities = state.cities.filter(city => city.id !== action.payload.id && city.name !== action.payload.name)
    },
    clearError: (state) => {
      state.error = null
      state.status = 'idle'
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCity.pending, (state) => {
        console.log('fetchCity.pending');
        state.status = 'loading';
      })
      .addCase(fetchCity.fulfilled, (state, action: PayloadAction<City>) => {
        console.log('fetchCity.fulfilled', action.payload);
        state.status = 'succeeded';
        if (!state.cities.some(city => city.id === action.payload.id && city.name === action.payload.name)) {
          state.cities.push(action.payload)
      }})
      .addCase(fetchCity.rejected, (state, action) => {
        console.log('fetchCity.rejected', action.error.message);
        state.status = 'failed';
        state.error = action.error.message || 'Error fetching city';
      });
  },
})

export const selectCities = (state: RootState): City[] => state.weather.cities;
export const selectStatus = (state: RootState) => state.weather.status;
export const selectError = (state: RootState) => state.weather.error;
export const { clearError, deleteCity } = weatherSlice.actions
export default weatherSlice.reducer
