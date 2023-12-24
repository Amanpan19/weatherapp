import './App.css';
import Weather from './Component/WeatherComp/Weather';
import Map from './Component/MapComp/Map';
function App() {
  return (
    <div className="App">
    <p className='appName'>OnWeather App</p>
      <Weather/>
      <Map/>
    </div>
  );
}

export default App;
