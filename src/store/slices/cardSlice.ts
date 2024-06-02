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

  export const fetchCity = createAsyncThunk('city/fetchCity', async (cityName: string, { rejectWithValue }) => {
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
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  });

  export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
      addCity: (state, action: PayloadAction<City>) => {
          state.cities.push(action.payload)
      },
      deleteCity: (state, action: PayloadAction<string>) => {
          state.cities = state.cities.filter(city => city.id !== action.payload)
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
          if (!state.cities.some(city => city.id === action.payload.id) && !state.cities.some(city => city.name === action.payload.)) {
            state.cities.push(action.payload)
          }
        })
        .addCase(fetchCity.rejected, (state, action) => {
          console.log('fetchCity.rejected', action.error.message);
          state.status = 'failed';
          state.error = action.error.message || 'Error fetching city';
        });
    },
  })

  export const selectCities = (state: RootState):City[] => state.weather.cities
  export const selectStatus = (state: RootState) => state.weather.status
  export const selectError = (state: RootState) => state.weather.error
  export const { clearError, addCity, deleteCity } = weatherSlice.actions
  export default weatherSlice.reducer
