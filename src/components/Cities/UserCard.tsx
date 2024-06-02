import React from 'react'
import { City } from '../../store/slices/cardSlice';
import cl from './CityCard.module.css'

interface CityCardProps{
    city: City;
}

const UserCard: React.FC<CityCardProps> = ({city}) => {

return (    
    <div className={cl.container}>
      <h1 className={cl.header}>{city.name}</h1>
      <div className={cl.details}>
        <p className={cl.detailItem}>Температура: {city.temperature}</p>
        <p className={cl.detailItem}>Время: {city.localTime}</p>
      </div>
    </div>
    )}

export default UserCard;