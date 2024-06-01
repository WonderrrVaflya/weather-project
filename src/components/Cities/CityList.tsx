import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchCity, selectCities } from '../../store/slices/cardSlice';
import CityCard from './CityCard';
import UserCity from './UserCity';

const CityList: React.FC = () => {
  const dispatch = useAppDispatch();
  const cities = useAppSelector(selectCities);
  const loading = useAppSelector((state) => state.weather.status === 'loading');
  const status = useAppSelector((state) => state.weather.status);
  const error = useAppSelector((state) => state.weather.error);

  return (
    <>  
      <div>
        <h1>List of Towns:</h1>
        {loading && <p>Loading...</p>}
        {cities.length === 0  && <p>Вы еще не добавили ни одного города</p>}
        {status === 'succeeded' && cities.map((city) => (
          <CityCard key={city.id} city={city} />
        ))}
        {status === 'failed' && <p>{error}</p>}
      </div>
      <div>
        <h1>Your City:</h1>
        <UserCity />
      </div>
    </>
  );
}

export default CityList;

