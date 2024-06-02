import axios from "axios";
import cl from "./UserCity.module.css"
import { City, clearError, fetchCity } from "../../store/slices/cardSlice";
import { useAppDispatch } from "../../store/store";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";


const UserCity: React.FC = () => {
    const dispatch = useAppDispatch()
    const [userCity, setUserCity] = useState<City | null>(null)
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [cityDataLoaded, setCityDataLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (navigator.geolocation && !cityDataLoaded ) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
        console.log(navigator.geolocation)
      } else {
        setLoading(false);
      }
    },[dispatch]) 
    
  async function showPosition(position: { coords: { latitude: any; longitude: any; }; }) {
    try {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const response = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=9f00e8da1bfae015ad968986513086bf&units=metric`);
      const userCityData = response.data;
      console.log(userCityData) 
      const city = await dispatch(fetchCity(userCityData[0].name)).unwrap();
      setUserCity(city)
      setCityDataLoaded(true)
      setLoading(false)
    } catch (error) {
      setError("Error fetching city data.");
      dispatch(clearError())
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
    <div className={cl.container}>
      <h1 className={cl.title}>Ваш город</h1>
      {loading ? (    
        <p className={cl.loading}>Загрузка...</p>
      ) : userCity ? (
        <UserCard key={userCity.id} city={userCity} />
      ) : (
        <div className={cl.errorContainer}><p>{error}</p></div>
      )}
    </div>
  );
}

export default UserCity