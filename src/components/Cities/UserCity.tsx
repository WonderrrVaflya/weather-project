import axios from "axios";
import { City, fetchCity, selectCities } from "../../store/slices/cardSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import CityCard from "./CityCard";
import { useEffect, useState } from "react";


const UserCity: React.FC = () => {
    const cities = useAppSelector(selectCities)
    const dispatch = useAppDispatch()
    const [userCity, setUserCity] = useState<City | null>(null  )

    useEffect(() => {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        console.log("Геолокация не поддерживается этим браузером.");
      }
    },[]) 
    
  async function showPosition(position: { coords: { latitude: any; longitude: any; }; }) {
    try {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const response = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=9f00e8da1bfae015ad968986513086bf&units=metric`);
      const userCityData = response.data;
      console.log(userCityData)
      const city = await dispatch(fetchCity(userCityData.name)).unwrap();
        setUserCity(city)
    } catch (error) {
      console.error("Error fetching city data:", error);
    }
  }

  function showError(error: GeolocationPositionError) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("Пользователь отклонил запрос на геолокацию.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Информация о местоположении недоступна.");
        break;
      case error.TIMEOUT:
        console.log("Время запроса на получение местоположения истекло.");
        break;
      default:
        console.log("Произошла неизвестная ошибка.");
        break;
    }
  
  }

  return (
    <div>
        <h1>
        {userCity ? (
        <CityCard key={userCity.id} city={userCity} />
      ) : (
        <p>Загрузка...</p>
      )}
        </h1>
    </div>
  )
}

export default UserCity;