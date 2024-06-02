import { useState } from 'react'
import { useAppDispatch } from '../../store/store'
import { fetchCity } from '../../store/slices/cardSlice'
import cl from './AddCity.module.css'

const AddCity: React.FC = () => {
    const [cityName, setCityName] = useState('')
    const dispatch = useAppDispatch()

    const handleAddCity = async () => {
      if (cityName) {
        try { 
          await dispatch(fetchCity(cityName)).unwrap();
          setCityName('');
        } catch (error) {
          alert('Failed to add city');
        }
      }}

  return (
    <div className={cl.container}>
      <h1 className={cl.header}>Найдите город</h1>
      <input
        type='text'
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        className={cl.input}
        placeholder="Введите название города"
      />
      <button onClick={() => handleAddCity()} className={cl.button}>
        Добавить
      </button>
    </div>
  )
}

export default AddCity