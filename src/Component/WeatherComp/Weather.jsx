import React, { useEffect, useState } from 'react'
import './weather.css';
import search_img from '../Assets/search.png';
import cloud_img from '../Assets/cloud.png';
import humid from '../Assets/humidity.png';
import windPng from '../Assets/wind.png';
import visibility from '../Assets/visibility.png';
import rain from '../Assets/rain.png';
import clear from '../Assets/clear.png';


const Weather =() => {
  const [city, setCity]= useState(null);
  const [search, setSearch]=useState("Delhi");

  let imgSrc = "";
  
      useEffect(()=>{
        const weatherData = async()=>{
        
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=fbfce8babedd6e47a51541f12cee44b`;
          
          
            let response = await fetch(url);
            let data = await response.json();  
            console.log(data);
            setCity(data);
          
        };
        weatherData();
      },[search])

      const time = new Date();
      let hour = time.getHours();
      const min = time.getMinutes();
      let period = "AM";
      if(hour>=12 && hour<23){
        period="PM";
      }
      if(hour===0){
        hour=12;
      }
      
      const convertToCelcius = (tempK)=>{
        return (tempK-273.15).toFixed(2);
      }
      
      if(city && city?.weather){
        
        const weatherMain = city?.weather[0]?.main;

        if(weatherMain==="Rain"){
           imgSrc = rain;
        }
        else if(weatherMain==="Clear"){
          imgSrc = clear;
        }
        else if(weatherMain==="Cloud"||weatherMain==="fog"){
          imgSrc = cloud_img;
        }
        else{
          imgSrc = cloud_img;
        }
      }

      const handleEvent = (event) =>{
         if(event.key==='Enter'){
            setSearch(event.target.value);
         }
      }

      const searchIcon = () =>{
         setSearch(document.querySelector('.searchInput').value);
      }

  return (
    
    <div className='mainDiv'>
   <div className="topInput">
   <div className="time">
   <p>{hour===0?(hour=12):(hour)}:{min}</p>
   <p className='period'>{period}</p>
   </div>
   
      <input type="text" placeholder='Search'  className='searchInput'  onKeyDown={handleEvent}/>
      <div className="search_icon">
         <img src={search_img} alt="" onClick={searchIcon}/>
      </div>
   </div>
   {imgSrc==="" ? (
   <p className='dataNot'>Data Not Found</p>
   ):(
   <div>
      <div className="weather_img">
         <img src={imgSrc} alt="" />
      </div>
      <div className="temp">
         <p>{city && `${city.name} | ${ convertToCelcius(city?.main?.temp)}°C`}</p>
      </div>
      <div className="extraData">
         <div className="element">
            <p>Humidity</p>
            <div className="humidity">
               <img src={humid} alt="" />
               <p>{city?.main?.humidity}%</p>
            </div>
         </div>
         <div className="element">
            <p>Wind Speed</p>
            <div className="windSpeed">
               <img src={windPng} alt="" />
               <p>{city?.wind?.speed} km/h</p>
            </div>
         </div>
         <div className="element">
            <p>Visibility</p>
            <div className="visiB">
               <img src={visibility} alt="" />
               <p>{city?.visibility/1000} km</p>
            </div>
         </div>
      </div>
   </div>
   )}
</div>
  )
}

export default Weather
