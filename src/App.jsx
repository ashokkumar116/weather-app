
import { useEffect, useState } from 'react'
import './App.css'
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa6";

function App() {

  const [text,setText] = useState("Ariyalur");
  const [weather,setWeather] = useState(null);
  const [city,setCity] = useState(null);
  const [cityNot,setCityNot] = useState(false);
  const [country,setCountry] = useState(null);
  const [description,setDescriptionn] = useState(null);
  const [humidity,setHumidity] = useState(null);
  const [wind,setWind] = useState(null);
  const [icon,setIcon] = useState(null);
  const [iconlink,setIconLink] = useState(null);
  const[isLoading,setIsLoading] = useState(false);


  const handleSearch = (e)=>{
    setText(e.target.value)
  }

  const getWeather = async () =>{
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=35830609bd62fc730b37c1412cd35819&units=metric`;
    
    try {
      setCityNot(false)
      let res = await fetch(url);
      let data = await res.json();
      setIsLoading(true);
      setWeather(data.main.temp);
      setCity(data.name);
      const iconCode = data.weather[0].icon;
      setIcon(iconCode);
      setCountry(data.sys.country)
      setDescriptionn(data.weather[0].description)
      setHumidity(data.main.humidity)
      setWind(data.wind.speed)
      let iconUrl = `../src/assets/svg/${iconCode}.svg`
      setIconLink(iconUrl);
    } catch (error) {
      setIsLoading(false)
      setCityNot(true)
      setCity(null);
      setIcon(null);
    }
    finally{
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    getWeather();
  },[])

  return (
    <>
      <div className="container border-1 border-primary p-8 bg-light-900 shadow-xl rounded-md w-100 flex flex-col justify-center items-center max-md:w-80">
        <h1 className='title'>WEATHER APP</h1>
        <div className="search">
        <form action={getWeather}>
        <label className="input input-primary w-80 max-md:w-60">
          <svg className="h-[1em] opacity-80 text-primary " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
          <input type="search" required placeholder="Search" value={text} onChange={(e)=>handleSearch(e)} readOnly={isLoading}/>
        </label>
        </form>
        </div>
        <div className="weather-details">
          {isLoading && (
            <h1 className='hd'>Loading Please Wait...</h1>
          )}
          {cityNot && (
            <h1 className='hd'>City Not Found</h1>
          )}
          {!cityNot && (
            <>
            <img src={iconlink} alt="" className='h-60 max-md:h-50'/>
            <h1 className='h1'>{weather} °C</h1>
            <p className='desc'>{description}</p>
            <h1 className='city'>{city} , {country}</h1>
            <div className="hw flex justify-between mt-10">
              <div className="humidity flex flex-col justify-center items-center space-y-4">
                <WiHumidity className='text-3xl text-primary'/>
              <span className='wd'>{humidity} %</span>
              </div>
              <div className="wind  flex flex-col justify-center items-center space-y-4">
                <FaWind className='text-3xl text-primary'/>
              <span className='wd'>{wind} km/h</span>
              </div>
              
            </div>
            
            </>
          )}
        </div>
        <div className="credit mt-10 text-gray-600 text-sm max-md:text-[11px]">
                <h1>&copy; Designed and Developed by <span className='text-primary font-bold'>ASHOK KUMAR P</span></h1>
        </div>
      </div>
    </>
  )
}

export default App
