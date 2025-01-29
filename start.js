import React from 'react'
import rock from './images/ROCK.png';
import scissors from './images/SCISSORS.png';
import './start.css';

const Start = () => {
    const handlecom = () =>{
        window.location.href='/computerGame';
    }
    const handlefrnd =() => {
        window.location.href='/friendGame';
    }
  return (
    <div className='con4'>
        <h1>LET'S START!!</h1>
        <p className='text2'>SELECT YOUR PLAY..</p>
      <div className='con5'>
        <button className='compbtn' onClick={handlecom}>
            PLAY WITH COMPUTER
        </button>
        <button className='frndbtn' onClick={handlefrnd}>
            PLAY WITH FRIEND
        </button>
      </div>
    </div>
  )
}

export default Start
