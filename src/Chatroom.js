import React, { useState,useEffect } from 'react'
import './new.css'
import {db,auth} from './firebase.js'
import {useHistory} from 'react-router-dom'
import {useStateValue} from './StateProvider'



function Chatroom() {
const [message,setMessage]=useState('')
const [display,setDisplay]=useState([])
const [{user}]=useStateValue()
const [orders,setOrders]=useState()
const [userdata,setUserdata]=useState([])
const [location,setLocation]=useState()
const [open,setOpen]=useState(true)
const [abled,setAbled]=useState(true)
const history=useHistory()

useEffect(() => {

    auth.onAuthStateChanged(authUser=>{
       
    if(authUser){
       db.collection('login').doc(authUser?.uid).onSnapshot(snapshot=>{
           
            setUserdata(snapshot.data())
            db
            .collection('users')
            .doc(snapshot.data().room)
            .collection('message')
            .orderBy('created','asc')
            .onSnapshot(snapshot=>{

             setOrders(snapshot.docs.map(doc=>({
    
                 id:doc.id,
                 data:doc.data()
             })))
            })
        }            
        )
    }else{
        alert('please login to continue')
       
        history.push('/')
    }

})
    
    
}, [user])


const Handler=(each)=>{
    
   const dateObj2 = new Date(each.data.created);
   const newIST= dateObj2.getTime() + ( 5.5 * 60 * 60 * 1000 )
   const dateObj = new Date(newIST)
          const  utcString = dateObj.toUTCString();
          const  time = utcString.slice(-12, -7)
            return time
}

const clickHandler=(e)=>{
    e.preventDefault()
    setAbled(true)
    const now = new Date()
   setDisplay([...display,message])

  console.log(display.length)
   db.collection('users').doc(userdata.room).collection('message').add({
       name:userdata.name,
       message:message,
       created:now.getTime(),
   })

   setMessage('')

}

const signOuthandler=(e)=>{
e.preventDefault()
auth.signOut()
// console.log(user?.uid)
alert('signed out')
history.push('/')
}
const locationHandler=(e)=>{
e.preventDefault()
navigator.geolocation.getCurrentPosition((position )=>{
     
    setLocation()        
    const now = new Date()
    db.collection('users').doc(userdata.room).collection('message').add({
        name:userdata.name,
        location:'https://google.com/maps?q='+position.coords.latitude+','+position.coords.longitude,
        created:now.getTime(),
     //    time:now  
    })
   })       
   setAbled(true)
}
const inputHandler=(e)=>{

setMessage(e.target.value)
if(e.target.value===''){
    setAbled(true)
}else{
    setAbled(false)
}
}

const chatHandler=()=>{
    setOpen(!open)
}

    return (
        <div className='main'>
            <div className="chat__sidebar" id="sidebar"></div>
          <div className={open===true?'side__left':'side__leftclick'}>
          <div>
              <h3>Participants</h3>
 
          </div>
          <div onClick={chatHandler} style={{backgroundColor:'green'}} className='head'>Click here to Chat</div>
          </div>
          <div className={open===true?'side__right2':'right2click'}>
          
              <div className='roomname'>
              <button onClick={chatHandler}>back</button>
              <h3>{userdata.room}</h3>
              </div>
          <div className='side__right'>
            <div className='display__message1'>
                {
                   orders?.map((each,index)=>{
                     
                       return <div key={each.created} className='display__message2'>
                           <div className='time'>
                           <h4>{each.data.name}</h4>
                       <p>{Handler(each)}</p>
                           </div>
                       
                           {each.data.message?<p>{each.data.message}</p>:<a href={each.data.location}>this is my current location</a>}
                       
                      </div>
                   })
                }
               
             
            </div>
 
          <div className='footer'>
              <input value={message} 
              onChange={inputHandler}/>
              <button disabled={abled} onClick={clickHandler}>Send</button>
              <button onClick={locationHandler}>location</button>
              <button onClick={signOuthandler}>logout</button>
          </div>
          </div>
          </div>
          
        </div>
    )
}

export default Chatroom
