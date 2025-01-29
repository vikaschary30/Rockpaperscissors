import React, { useState } from 'react';
import './computerGame.css';
import rock from './images/ROCK.png';
import rock2 from './images/ROCK2.png';
import scissors from './images/SCISSORS.png';
import paper2 from './images/PAPER2.png';
import paper from './images/PAPER.png';
import scissors2 from './images/SCISSORS2.png';
import sr from './images/sr.png';
import sp from './images/sp.png';
import ss from './images/ss.png';

const ComputerGame = () => {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [message, setMessage] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);

  const choices = ['rock', 'paper', 'scissors'];
  const choices2 = ['rock2', 'paper2', 'scissors2']
  const choiceImages = {
    rock: rock,
    paper: paper,
    scissors: scissors,
    rock2: rock2,
    paper2: paper2,
    scissors2: scissors2,
  };

  const handleClick = (choice) => {
    const computerChoice = choices2[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setComputerChoice(computerChoice);
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
      determineWinner(choice, computerChoice);
    }, 1000); // Match this duration to the animation duration
  };

  const determineWinner = (playerChoice, computerChoice) => {
    if (playerChoice+"2" === computerChoice) {
      setMessage(`It's a tie! Both chose ${playerChoice}`);
    } else if (
      (playerChoice === 'rock' && computerChoice === 'scissors2') ||
      (playerChoice === 'paper' && computerChoice === 'rock2') ||
      (playerChoice === 'scissors' && computerChoice === 'paper2')
    ) {
      setPlayerScore(playerScore + 1);
      setMessage(`You win this round! ${playerChoice} beats ${computerChoice.replace("2","")}`);
    } else {
      setComputerScore(computerScore + 1);
      setMessage(`Computer wins this round! ${computerChoice.replace("2","")} beats ${playerChoice}`);
    }

    if (playerScore === 2) {
      setMessage(`You win the game! ${playerScore +1} - ${computerScore +1}`);
      resetGame();
    } else if (computerScore === 2) {
      setMessage(`Computer wins the game! ${playerScore +1} - ${computerScore +1}`);
      resetGame();
    }
  };

  const resetGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setPlayerChoice(null);
    setComputerChoice(null);
  };

  return (
    <div>
      <h1>LET'S PLAY!!</h1>
      <div className="container">
        <div className="scoreboard">
          <p className='text'>SCORE '3' POINTS TO WIN!!</p>
          <div className="player">
            <h2>Player</h2>
            <p className="score">{playerScore}</p>
          </div>
          <div className="player">
            <h2>Computer</h2>
            <p className="score">{computerScore}</p>
          </div>
        </div>
        <div className='images'>
          <img 
            src={isShaking ? choiceImages[playerChoice] : rock } 
            className={`rockimage2 ${isShaking ? 'shake' : ''}`} 
            alt='player-choice'
          />
          <img 
            src={isShaking ? choiceImages[computerChoice] : rock2 } 
            className={`rockimage3 ${isShaking ? 'shake' : ''}`} 
            alt='computer-choice'
          />
        </div>
        <div className="controls">
          <img onClick={() => handleClick('rock')} src={sr} alt='sr' className='sr'></img>
          <img onClick={() => handleClick('paper')} src={sp} alt='sp' className='sp'></img>
          <img onClick={() => handleClick('scissors')} src={ss} alt='ss' className='ss'></img>
        </div>
        <div className="message">{message}</div> 
      </div>
    </div>
  );
};

export default ComputerGame;
