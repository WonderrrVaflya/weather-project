  import { createAsyncThunk } from '@reduxjs/toolkit'
  import axios from 'axios'

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
