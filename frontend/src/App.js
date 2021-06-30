import React from 'react';
import { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import './App.css';
//const { REACT_APP_MAPBOX} = process.env;
//import { DotenvConfigOptions } from 'dotenv'

//DotenvConfigOptions.config()

function App() {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 17.6868,
    longitude: 83.2185,
    zoom: 4
  });
  return (
    <div className="App">
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      mapStyle='mapbox://styles/sk-ismail/ckqjtp95c0ls317mkbqhic7cz'
      onViewportChange={nextViewport => setViewport(nextViewport)}
    />
    </div>
  );
}

export default App;
