import React from 'react'
import { City } from '../../store/slices/cardSlice';
import cl from './CityCard.module.css'

interface CityCardProps{
    city: City;
}

const UserCard: React.FC<CityCardProps> = ({city}) => {

return (    
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
    )}

export default UserCard;