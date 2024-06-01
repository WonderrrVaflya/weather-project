import axios from "axios";
import { City, fetchCity } from "../../store/slices/cardSlice";
import { useAppDispatch } from "../../store/store";
import CityCard from "./CityCard";
import { useEffect, useState } from "react";


const UserCity: React.FC = () => {
    const dispatch = useAppDispatch()
    const [userCity, setUserCity] = useState<City | null>(null)
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        setError("Геолокация не поддерживается этим браузером.");
        setLoading(false);
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
      setLoading(false)
    } catch (error) {
      setError("Error fetching city data.");
      setLoading(false);
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
    setLoading(false);
  }

  return (
    <div>
      {loading ? (
        <p>Загрузка...</p>
      ) : userCity ? (
        <CityCard key={userCity.id} city={userCity} />
      ) : (
        <p>{error}</p>  
      )}
    </div>
  );
}

export default UserCity;