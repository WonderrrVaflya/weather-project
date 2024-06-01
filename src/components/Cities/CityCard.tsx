import React from 'react'
import { useAppDispatch} from '../../store/store'
import { City, deleteCity } from '../../store/slices/cardSlice';

interface CityCardProps{
    city: City;
}

const CityCard: React.FC<CityCardProps> = ({city}) => {
  const dispatch = useAppDispatch()

return (
    <div>
        <h1>{city.name}</h1>
        <p>{city.temperature}</p>
        <p>{city.localTime}</p>
        <button onClick={() => dispatch(deleteCity(city.id))}>X</button>
    </div>
    )}

export default CityCard;