import { Cancel, Room } from '@material-ui/icons'
import axios from 'axios'
import React, {useRef, useState} from 'react'
import './Register.css'

const Register = ({setshowRegister}) => {

const [successful, setsuccessful] = useState(false)
const [error, seterror] = useState(false)

const usernameRef = useRef(null)

const emailRef = useRef(null)
const passwordRef= useRef(null)



    const handleSubmit= async (e)=>{
          e.preventDefault()   
          const newUser={
              username: usernameRef.current.value,
              email: emailRef.current.value,
              password: passwordRef.current.value
          }  
          try {
            await axios.post('https://location-review-api.herokuapp.com/api/user/register', newUser);
            seterror(false)
            setsuccessful(true)
          } catch (error) {

            seterror(true)
              
          }
      

    }


    return (
        <div className="RegisterApp">
            <div className='logo'>
             <Room/>
             Location-Review
            </div>
            <div><h4>Register</h4></div>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input className='inputUsername'  type='text' placeholder='Enter Username' ref={usernameRef}/>
                <input className='inputEmail' type='email' placeholder='Enter Email' ref={emailRef} />
                <input className='inputPassword' type='password' placeholder='Enter Password' ref={passwordRef} />
                <button>Register</button>
                {successful && <div className='toastBtn1'>You can login now!</div>}
                {error && <div className='toastBtn2'>Somethin went wrong!</div> }
                
            </form>
            <div className='cancelBtn'><Cancel onClick={()=>setshowRegister(false)} /></div>
        </div>
    )
}

export default Register
