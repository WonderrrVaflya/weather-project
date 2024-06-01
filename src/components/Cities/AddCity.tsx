import { useState } from 'react'
import { useAppDispatch } from '../../store/store'
import { addCity } from '../../store/slices/cardSlice'
import axios from 'axios'

const AddCity: React.FC = () => {
    const [cityName, setCityName] = useState('')
    const dispatch = useAppDispatch()

    const handleAddCity = async () => {
        if(cityName) {
        try {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9f00e8da1bfae015ad968986513086bf&units=metric`);
          const cityData = response.data;
          let xhr = new XMLHttpRequest();
          xhr.open('GET', 'http://worldtimeapi.org/api/timezone/Europe/London', false)
          xhr.send()
          if (xhr.status != 200) {
              console.log( xhr.status + ': ' + xhr.statusText )
          } else {
              let time = xhr.responseText
              let z = JSON.parse(time).utc_datetime
              let time1 = new Date(z).getTime()
              let timestampPlus = time1 + (cityData.timezone * 1000)
              let timePlus = new Date(timestampPlus)
              let hours = ('0' + timePlus.getUTCHours()).slice(-2)
              let minutes = ('0' + timePlus.getUTCMinutes()).slice(-2)             
              let result = hours + ':' + minutes; 
          console.log(cityData)
          const city = {
            id: cityData.id.toString(),
            name: cityData.name,
            temperature: Math.floor(Number(cityData.main.temp)).toString(),
            localTime: result
          };
          dispatch(addCity(city));
          setCityName('');
        }} catch (error) {
          console.error(error);
        }
      }}

  return (
    <div>
        <input type='text' value={cityName} onChange={(e) => setCityName(e.target.value)}/>
        <button onClick={handleAddCity}/>
    </div>
  )
}

export default AddCity