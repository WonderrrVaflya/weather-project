import React from 'react';
import { useAppSelector } from '../../store/store';
import { selectCities, selectStatus, selectError } from '../../store/slices/cardSlice';
import CityCard from './CityCard';
import cl from './CityList.module.css'

const CityList: React.FC = () => {
  const cities = useAppSelector(selectCities);
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);


  return (
    <div className={cl.mainContainer}>
    <h1>List of Towns:</h1>
      <div className={cl.cityContainer}>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'succeeded' && cities.length > 0 ? (
          <>
            {cities.map((city) => (
              <div key={city.id}   className={cl.cityCard}><CityCard city={city} /></div>
            ))}
          </>
        ) : (
          status === 'failed' && cities.length === 0 ? <p>{error}</p> : <p className={cl.noCities}>Вы еще не добавили ни одного города</p>
        )}
      </div>
    </div>
  );
}

export default CityList;


