import { useEffect, useReducer, useState } from 'react';
import './App.css';
import './styles.css'
import audio from './click.wav'
import alarm from './alarm.mp3'

const Actions={
  pomo:'pomo',
  short_break:'short_break',
  long_break:'long_break',
  updateTime:'update-time',
  stop:'stop'
} 

const ini={
  minute: '25' ,
  second: '00',
}
function reducer(state,{type}){
  switch(type){
    case 'pomo':
      return {
        ...state,
        minute:'25',
        second: '00'
      }
    case 'short_break':
      return {
        ...state,
        minute: '05',
        second: '00'
      }
    case 'long_break':
      return {
        ...state,
        minute: '20',
        second: '00'
      }
    case 'update-time':
      if(state.second==='00' || state.second==='0') 
      return{
        ...state,
        minute:`${Number(state.minute)-1}`,
        second:'59'
      }
      return{
        ...state,
        minute:state.minute,
        second:`${Number(state.second)-1}`
      }
  }
}


function App() {
  const [state,dispatch]=useReducer(reducer,ini)
  const [start,setStart]=useState(false)
  const tick=()=>{
    dispatch({type:Actions.updateTime})
  }
  useEffect(()=>{
    document.title='Pomodoro'
    let inte=null;
    if (state.minute==='0' && state.second==='0') {setStart(false); new Audio(alarm).play()}
    if(start){
      inte=setInterval(tick,1000);
    }
    return ()=>clearInterval(inte);
  })  
  
  
  return (
    <div className="App">
      <div className='timer-container'>
        <div className='timer-button-container'>
          <button onClick={()=>dispatch({type:'pomo'})}>Pomodoro</button>
          <button onClick={()=>dispatch({type:'short_break'})}>Short Break</button>
          <button onClick={()=>dispatch({type:'long_break'})}>Long Break</button>
        </div>
        <div className='timer'>{state.minute}:{state.second}</div>
        <div className='control-buttons'>
          <button onClick={()=>{setStart(true); new Audio(audio).play();}}>Start</button>
          <button onClick={()=>{setStart(false);new Audio(audio).play();}}>Pause</button>
        </div>
      </div>
      <div className='playlist'>
      <iframe src="https://open.spotify.com/embed/playlist/6Frt5nejkY5sP5Tqdfk7uh?utm_source=generator" width="630px" height="200px" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      </div>
    </div>
  );
}

export default App;
