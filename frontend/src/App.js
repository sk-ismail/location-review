import React, { useEffect } from 'react';
import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import './App.css';
import { Room } from '@material-ui/icons'
import axios from 'axios'
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
  const [pin, setPin] = useState([])
  const [showPopup, togglePopup] = React.useState(false);
  const fetchData= async ()=>{
        await axios.get('/pin')
        .then(({ data })=>{ 
          setPin(data.data)
          console.log(data.data)
        })
        .catch((err)=>{ console.log(err) } )
  }

  useEffect(()=>{
   
    fetchData()

  },[])

  return (
    <div className="App">
      <>
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      mapStyle='mapbox://styles/sk-ismail/ckqjtp95c0ls317mkbqhic7cz'
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
     {pin.map((p, key)=>(
       <>
      <Marker
      latitude={p.lat}
      longitude={p.long}
      offsetLeft={-viewport.zoom*3.5}
      offsetTop={-viewport.zoom*7}
      key={p._id}
          >
  
  <Room style={{ fontSize: viewport.zoom*7 , color: "white" , cursor: "pointer"}}/>

</Marker>
{showPopup && <Popup
          latitude={p.lat}
          longitude={p.long}
          closeButton={true}
          closeOnClick={false}
          onClose={() => togglePopup(false)}
          anchor="top" >
          <div>You are here</div>
        </Popup>}
</>
     ))}

      
      </ReactMapGL>
  
  </>
      
    </div>
  );
}

export default App;
