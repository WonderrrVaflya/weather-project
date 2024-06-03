import React from 'react'
import { useAppDispatch} from '../../store/store'
import { City, deleteCity } from '../../store/slices/cardSlice';
import cl from './CityCard.module.css'

interface CityCardProps{
    city: City;
}

const CityCard: React.FC<CityCardProps> = ({city}) => {
  const dispatch = useAppDispatch()

return (    
  <div className={cl.container}>
  <div className={cl.cityCard}> 
    <div className={cl.cityInfo}>
      <h2>{city.name}</h2>
      <p>Температура: <b>{city.temperature}°C</b></p>
      <p>Время: <b>{city.localTime}</b></p>
      <p>Погода: <b>{city.description}</b></p>  
    </div>
    <div className={cl.cityIcon}>
      <img src={city.icon} alt={city.description} />
    </div>  
  </div>
  <button className={cl.buttonDel} onClick={() => dispatch(deleteCity(city))}>Удалить</button>
  </div>
    )}

export default CityCard;