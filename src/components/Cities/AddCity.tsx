import { useState } from 'react'
import { useAppDispatch } from '../../store/store'
import { fetchCity } from '../../store/slices/cardSlice'

const AddCity: React.FC = () => {
    const [cityName, setCityName] = useState('')
    const dispatch = useAppDispatch()

    const handleAddCity = async () => {
      if (cityName) {
        try {
          await dispatch(fetchCity(cityName)).unwrap();
          setCityName('');
        } catch (error) {
          console.error('Failed to add city:', error);
        }
      }}

  return (
    <div>
        <input type='text' value={cityName} onChange={(e) => setCityName(e.target.value)}/>
        <button onClick={handleAddCity}/>
    </div>
  )
}

export default AddCity