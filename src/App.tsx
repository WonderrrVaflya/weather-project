import './App.css'
import AddCity from './components/Cities/AddCity'
import CityList from './components/Cities/CityList'
import UserCity from './components/Cities/UserCity'

function App() {

  return (
    <>
      <UserCity />
      <AddCity/>
      <CityList/>      
    </>
  )
}

export default App
