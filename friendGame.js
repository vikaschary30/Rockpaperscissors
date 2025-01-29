import React, { useState, useEffect } from 'react';
import './friendGame.css';
import rock from './images/ROCK.png';
import rock2 from './images/ROCK2.png';
import scissors from './images/SCISSORS.png';
import paper2 from './images/PAPER2.png';
import paper from './images/PAPER.png';
import scissors2 from './images/SCISSORS2.png';
import sr from './images/sr.png';
import sp from './images/sp.png';
import ss from './images/ss.png';

const FriendGame = () => {
    const [socket, setSocket] = useState(null);
    const [gameState, setGameState] = useState({ player: null, opponent: null, message: '', scores: [0, 0], playerChoice: null, opponentChoice: null });
    const [isShaking, setIsShaking] = useState(false);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
        setSocket(socket);

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.player) {
                setGameState(state => ({ ...state, player: message.player }));
            }
            if (message.message) {
                setGameState(state => ({ ...state, message: message.message }));
            }
            if (message.scores) {
                setGameState(state => ({ ...state, scores: message.scores }));
            }
            if (message.playerChoice && message.opponentChoice) {
                setGameState(state => ({ ...state, playerChoice: message.playerChoice, opponentChoice: message.opponentChoice }));
            }
        };

        return () => socket.close();
    }, []);

    const handleChoice = (choice) => {
        if (socket) {
            socket.send(JSON.stringify({ choice }));
            setGameState(state => ({ ...state, playerChoice: choice }));
        }setIsShaking(true);
        setTimeout(() => {
          setIsShaking(false);
        }, 1000);
    };
    const choiceImages = {
        rock: rock,
        paper: paper,
        scissors: scissors,
        rock2: rock2,
        paper2: paper2,
        scissors2: scissors2,
    };

    return (
        <div>
            <h1>LET'S PLAY!!</h1>
            <div className='container2'>
                <div className="scoreboard2">
                    <p className='text'>SCORE '3' POINTS TO WIN!!</p>
                    <div className="player">
                        <h2>Player 1</h2>
                        <p className="score">{gameState.scores[0]}</p>
                    </div>
                    <div className="player">
                        <h2>Player 2</h2>
                        <p className="score">{gameState.scores[1]}</p>
                    </div>
                </div>
                <div className='images2'>
                    <img 
                        src={isShaking ? choiceImages[gameState.playerChoice] : rock } 
                        className={`rockimage4 ${isShaking ? 'shake' : ''}`} 
                        alt='gameState.playerChoice'
                    />
                    <img 
                        src={isShaking ? choiceImages[gameState.opponentChoice] : rock2 } 
                        className={`rockimage5 ${isShaking ? 'shake' : ''}`} 
                        alt='gameState.opponentChoice'
                    />
                </div>
                <div className='container3'>
                <h2 className='msg'>{gameState.message}</h2>
                {gameState.player && (
                    <>
                        <img onClick={() => handleChoice('rock')} src={sr} alt='sr' className='sr'></img>
                        <img onClick={() => handleChoice('paper')} src={sp} alt='sp' className='sp'></img>
                        <img onClick={() => handleChoice('scissors')} src={ss} alt='ss' className='ss'></img>
                    </>
                )}
                </div>
                <div className='choices'>
                    <h2>Your choice: {gameState.playerChoice}</h2>
                    <h2>Opponent's choice: {gameState.opponentChoice}</h2>
                </div>
            </div>
        </div>
    );
};

export default FriendGame;
