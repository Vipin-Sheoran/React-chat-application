import './login.css'
import {auth,db} from './firebase.js'
import { useState } from 'react';
import {useHistory} from 'react-router-dom'
import {useStateValue} from './StateProvider'


function Login() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [name,setName]=useState('')
    const [room,setRoom]=useState('')
    const history=useHistory()
    const [{user},dispatch]=useStateValue('')
    
    // auth.onAuthStateChanged((authUser)=>{
    //   if(authUser){
    //     console.log(authUser)
    //     history.push('/chatroom')
    //   }
    // })

    const SignIn=async(e)=>{
      e.preventDefault()
     const data=await auth.signInWithEmailAndPassword(email,password).then(auth=>{
       db.collection('login').doc(auth.user.uid).set({
        room:room,
        name:name,
        id:auth.user.uid
      })

    //  const data2=db.collection('users').doc(auth.user.uid.room).collection('participants').add({
    //     name:auth.user.uid.name,
    // })

      dispatch({
        type:'ADD_USER',
        user:auth.user
      })
      history.push('/chatroom')
      }).catch(error=>alert(error.message))
     

      setEmail('')
      setPassword('')
      setName('')
      setRoom('')
  }
  const register=(e)=>{
      e.preventDefault()
      auth.createUserWithEmailAndPassword(email,password).then((auth)=>{
      console.log(auth)
      if(auth){
       
       
        console.log(auth.user.uid)
        db.collection('login').doc(auth.user.uid).set({
          room:room,
          name:name,
          id:auth.user.uid
        })
        dispatch({
          type:'ADD_USER',
          user:auth.user
        })
        history.push('/chatroom')
      }})
     
      .catch(error=>{
          alert(error.message)
      })
      
      
        console.log(user?.uid)
      setPassword('')
      setEmail('')
      setName('')
      setRoom('')
  }

    return (
        <div className='App'>
           <div className="centered-form">
     <div className="centered-form__box">
<h1>Join Here</h1>
<h4>Ask your friend to join with the same room name</h4>
<form action="/chat.html">
<label>User Name</label>
<input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Name" required></input>
<label>Room</label>
  <input type="text" value={room} onChange={e=>{setRoom(e.target.value)}} placeholder="Room" required></input>
  <label>Email Id</label>
  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" required></input>
  
  <label>Password</label>
  <input type="password" onChange={e=>setPassword(e.target.value)} placeholder="password" required></input>
  <button onClick={SignIn}>Sign In</button>
  <button onClick={register}>Create Account</button>
</form>
</div>
        </div>
        </div>
        
    )
}

export default Login
