import React from 'react'
import { useAppSelector } from '../../store/store'
import { selectCities } from '../../store/slices/cardSlice'
import CityCard from './CityCard'

const CityList: React.FC = () => {
  const cities = useAppSelector(selectCities)

  return (
    <div>
        <h1>Big Cities....</h1>
        {
            cities.map((city) => (
                <CityCard key={city.id} city={city}/>
            ))
        }
    </div>
  )
}

export default CityList