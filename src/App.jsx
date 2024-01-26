import { data } from "autoprefixer"
import { useState } from "react"


function App() {

  const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
  const API_KEY = 'f91b9df9417bede32f7f5f230da934f2'

  const [city, setCity] = useState('')
  const [dataWeather, setDataWeather] = useState(null)

  const handleChangeCity = (e) => {
    setCity(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (city.length>0) fetchWeather()
  }

  const fetchWeather = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}`)
      const data = await response.json()
      setDataWeather(data)
    } catch (error) {
      console.error('Ocurrió el siguiente error: ', error)
    }
  }

  return (
    <>
      <div className="bg-background bg-cover bg-bottom h-screen flex flex-col justify-center items-center p-2">
        <div className="bg-transparent border-2 backdrop-blur-md w-full md:max-w-xl p-5 rounded-3xl flex flex-col justify-center items-centers gap-5">
          <h1 className="text-center uppercase text-white font-bold text-4xl">Wheater App</h1>
          <form onSubmit={handleSubmit} className="flex flex-row">
            <input
              className="w-full rounded-l-md py-1 px-2 focus:outline-none"
              type="text"
              value={city}
              onChange={handleChangeCity} />
            <button
              type="submit"
              className="bg-stone-200 w-fit px-5 py-1 rounded-r-md">
              Search
            </button>
          </form>
          {
            dataWeather && (
              <div className="flex flex-col justify-end items-center font-medium text-lg text-center">
                <h2 className="text-2xl">{dataWeather.name}</h2>
                <p>Temperature: {parseInt(dataWeather?.main?.temp - 273.15)}°C</p>
                <p>Meteorological condition : {dataWeather.weather[0].description}</p>
                <img src={`https://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`} className="size-40" />
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default App
