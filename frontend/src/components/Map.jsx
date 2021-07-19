import React, { useEffect } from 'react';
import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import './Map.css';
import { Room, Star } from '@material-ui/icons'
import axios from 'axios'
import Login from './Login';
//const { REACT_APP_MAPBOX} = process.env;
//import { DotenvConfigOptions } from 'dotenv'
//DotenvConfigOptions.config()
import * as timeago from 'timeago.js'

import Register from './Register';

const Map = () => {

  const mystorage=window.localStorage;
    const [viewport, setViewport] = useState({
        width: '100vw',
        height: '100vh',
        latitude: 17.6868,
        longitude: 83.2185,
        zoom: 4
      });
      const [pin, setPin] = useState([])
      //const [showPopup, togglePopup] = React.useState(false);
      const [currentplace, setCurrentplace] = useState([]);
      const [newLocation, setnewLocation] = useState(null);
      const [title, settitle] = useState([]);
      const [location, setlocation] = useState(null);
      const [rating, setrating] = useState(0);
      const [description, setdescription] = useState([]);
      //const [userName, setuserName] = useState('')
      const [showRegister, setshowRegister] = useState(false)
      const [showLogin, setshowLogin] = useState(false)
      const [currentUser, setcurrentUser] = useState(mystorage.getItem("user"))
      const fetchData= async ()=>{
            await axios.get('https://location-review-api.herokuapp.com/api/pin')
            .then(({ data })=>{ 
              setPin(data.pindata)
              //console.log(data.pindata)
            })
            .catch((err)=>{ console.log(err) } )
      }
    
      useEffect(()=>{
       
        fetchData()
    
      },[])
    
    
      const handleRoomClick=(id, lat, long)=>{
        setCurrentplace(id)
        setViewport({...viewport, latitude: lat, longitude: long})
      }
      const handleDoubleClick=(e)=>{
        //alert("clicked")
        //console.log(e.lngLat)
        const [long, lat]=e.lngLat
        setnewLocation({ long , lat})
      }
      const handleFormSubumit= async (e)=>{
        //event.preventDefault()
        e.preventDefault()
        const newPin={
          username: currentUser,
          title,
          location,
          description,
          rating,
          lat: newLocation.lat,
          long : newLocation.long
        }
        //console.log(newPin)
        try {
          const fetchData= await axios.post('https://location-review-api.herokuapp.com/api/pin', newPin);
          //console.log(fetchData.data.data)
          setPin([...pin,fetchData.data.data])
          setnewLocation(null)
        } catch (error) {
          console.log(error)
          
        }
    
    
      }

      const handleLogut=()=>{
        mystorage.removeItem("user")
        setcurrentUser(null)
      }
    return (
        <div>
              <>
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      mapStyle='mapbox://styles/sk-ismail/ckqjtp95c0ls317mkbqhic7cz'
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onDblClick={(e)=>handleDoubleClick(e)}
      transitionDuration={300}
      
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
  
  <Room onClick={()=>handleRoomClick(p._id, p.lat, p.long)} style={{ fontSize: viewport.zoom*7 , color: p._id === currentplace? "red" : "white" , cursor: "pointer"}}/>

</Marker>

  { p._id === currentplace && (<Popup
          latitude={p.lat}
          longitude={p.long}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setCurrentplace(null)}
          className="popupCard1"
          anchor="top" >
          <div className='popupCard'>

            <div className='usernameCard'>
            <label className='labelCard'>Title:</label>
            <div className='content'>{p.title}</div>
            </div>
            <div className='usernameCard'>
            <label className='labelCard'>Location:</label>
            <div className='content'>{p.location}</div>
            </div>
            <div className='usernameCard'>
            <label className='labelCard'>Description:</label>
            <div className='content'>{p.description}</div>
            </div>
            <div className='usernameCard'>
            <label className='labelCard'>Rating:</label>
            <div className='starCard'>{Array(p.rating).fill(<div style={{color: "gold"}}><div><Star/></div></div>)}</div>
            </div>
            <div className='usernameCard'>
            <label className='labelCard'>Created by:</label>
            <div className='content'>{p.username}</div>
            </div>
            <div className='usernameCard'>
            <label className='labelCard'>Updated at:</label>
            <div className='content'>{timeago.format(p.updatedAt)}</div>
            </div>
            

          </div>
        </Popup>)}

 { newLocation && ( <Popup
          latitude={newLocation.lat}
          longitude={newLocation.long}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setnewLocation(null)}
          className="popupCard1"
          anchor="top" >
   <div>
     <form onSubmit={(e)=>handleFormSubumit(e)} >
       <label>Title</label>
       <input className='content' type="text" placeholder="Enter Title of the review" onChange={(e)=>settitle(e.target.value)}/>
       <label>Location</label>
       <input className='content' type='text' placeholder="Enter Area Name" onChange={(e)=>setlocation(e.target.value)}/>
       <label>Description</label>
       <textarea className='content' placeholder="Tell us something about this place" onChange={(e)=>setdescription(e.target.value)}></textarea>
       <label>Rating</label>
       <select className='content' onChange={(e)=>setrating(e.target.value)}>
         <option>1</option>
         <option>2</option>
         <option>3</option>
         <option>4</option>
         <option>5</option>
       </select>

       <button className='formBtn' type='submit'>Submit</button>
     </form>
   </div>
   
        </Popup>) }       

</>
     ))}



  { currentUser ? (<div className='logoutDiv'><button className="logoutBtn" onClick={()=>handleLogut()}>Logout</button></div>):( 
  <div className="headBtns">
   <button className='btnLogin'    onClick={()=>setshowLogin((prev)=> !prev)} >LogIn</button>
   <button className='btnRegister' onClick={()=>setshowRegister(true)} >Register</button>
   </div>)}

  
  {showRegister && <Register setshowRegister={setshowRegister} />}
  {showLogin && <Login setshowLogin={setshowLogin} mystorage={mystorage} setcurrentUser={setcurrentUser}/>}
 

      
      </ReactMapGL>
  
  </>
        </div>
    )
}

export default Map
