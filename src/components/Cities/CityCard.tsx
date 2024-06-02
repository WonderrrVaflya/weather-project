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
      <h1 className={cl.header}>{city.name}</h1>
      <div className={cl.details}>
        <p className={cl.detailItem}>Температура: {city.temperature}</p>
        <p className={cl.detailItem}>Время: {city.localTime}</p>
      </div>
      <button className={cl.buttonDel} onClick={() => dispatch(deleteCity(city.id))}>Удалить</button>
    </div>
    )}

export default CityCard;