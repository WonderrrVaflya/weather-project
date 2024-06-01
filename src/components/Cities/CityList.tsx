import React from 'react'
import { useAppSelector } from '../../store/store'
import { selectCities } from '../../store/slices/cardSlice'
import CityCard from './CityCard'
import UserCity from './UserCity'

const CityList: React.FC = () => {
  const cities = useAppSelector(selectCities)

  return (
    <>
      <div>
        <h1>List of Towns:</h1>
        {
            cities.map((city) => (
                <CityCard key={city.id} city={city}/>
            ))
        }
    </div>
    <div>
      <h1>ваш город:</h1>
      <UserCity/>
    </div>
    </>
  )
}

export default CityList