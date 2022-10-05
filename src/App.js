import React, {useState} from 'react';
import './App.css';
import './index.css';
import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5?'
const KEY = process.env.REACT_APP_API_KEY;


function App() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState({});
  const base = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=e98bfd52e8a50215ab6427574ecd80d4`

  const search = (event) => {
    if (event.key === 'Enter') {
      fetch(base)
      .then(response => response.json())
      .then(result => {
        setWeather(result);
        setLocation('');
        console.log(result);
      })
    }
  }

  
  const dateFunction = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }



  return (
    <div className= {(typeof weather.main != "undefined") ? ((weather.main.temp < 60) ? 'appCold' : 'App') : 'App'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search"
            onChange={e => setLocation(e.target.value)}
            value={location}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateFunction(new Date())}</div>
          </div>
          <div className="weatherBox">
            <div className="temp">
              {Math.round(weather.main.temp)}°F
            </div>
            <div className="weather-des">{weather.weather[0].main}</div>
            <div className='temp-min'> Minimum Temp: {Math.round(weather.main.temp_min)}°F </div>
            <div className='humidity'> Humidity: {weather.main.humidity} </div>
            <div className='temp-max'> Maximum Temp: {Math.round(weather.main.temp_max)}°F</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
