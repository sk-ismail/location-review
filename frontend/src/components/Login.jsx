import { Cancel, Room } from '@material-ui/icons'
import axios from 'axios'
import React, {useRef, useState} from 'react'
import './Login.css'

const Login = ({setshowLogin, setcurrentUser, mystorage}) => {

//const [successful, setsuccessful] = useState(false)
const [error, seterror] = useState(false)

const usernameRef = useRef(null)

const emailRef = useRef(null)
const passwordRef= useRef(null)



    const handleSubmit= async (e)=>{
          e.preventDefault()   
          const User={
              username: usernameRef.current.value,
              //email: emailRef.current.value,
              password: passwordRef.current.value
          }  
          try {
           const res= await axios.post('/user/login', User);
           console.log(res.data)
           
           mystorage.setItem('user', res.data.username);
           setcurrentUser(res.data.username)
           setshowLogin(false)
            seterror(false)
            //setsuccessful(true)
          } catch (error) {

            seterror(true)
            console.log(error)
              
          }
      

    }


    return (
        <div className="LoginApp">
            <div className='logoLogin'>
             <Room/>
             Location-Review
            </div>
            <form onSubmit={(e)=>handleSubmit(e)}>
            <input className='inputUsername'  type='text' placeholder='Enter Username' ref={usernameRef}/>
                
                <input className='inputPassword' type='password' placeholder='Enter Password' ref={passwordRef} />
                <button>Login</button>
                {error && <div className='toastBtn2'>Somethin went wrong!</div> }
                
            </form>
            <div className='cancelBtn'><Cancel onClick={()=>setshowLogin(false)} /></div>
        </div>
    )
}

export default Login

