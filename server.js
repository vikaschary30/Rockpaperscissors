const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let players = [];
let scores = [0, 0]; // Initialize scores for both players

const checkWinner = () => {
    if (scores[0] >= 3) return 1;
    if (scores[1] >= 3) return 2;
    return null;
};

const determineRoundWinner = (choice1, choice2) => {
    if (choice1 === choice2) return null;
    if (
        (choice1 === 'rock' && choice2 === 'scissors') ||
        (choice1 === 'scissors' && choice2 === 'paper') ||
        (choice1 === 'paper' && choice2 === 'rock')
    ) {
        return 0;
    }
    return 1;
};

wss.on('connection', (ws) => {
    console.log('New player connected');
    players.push(ws);

    if (players.length === 1) {
        ws.send(JSON.stringify({ message: 'Waiting for an opponent...' }));
    } else if (players.length === 2) {
        players.forEach((player, index) => {
            player.send(JSON.stringify({ message: 'Opponent found. Game started , select your option...', player: index + 1 }));
        });
    }

    ws.on('message', (message) => {
        const parsedMessage = JSON.parse(message);
        console.log('Received:', parsedMessage);

        if (parsedMessage.choice) {
            ws.choice = parsedMessage.choice;

            if (players.every(player => player.choice)) {
                const result = determineRoundWinner(players[0].choice, players[1].choice);

                if (result !== null) scores[result] += 1;

                players.forEach((player, index) => {
                    player.send(JSON.stringify({ playerChoice: player.choice, opponentChoice: players[1 - index].choice, scores }));
                });

                const winner = checkWinner();
                if (winner) {
                    players.forEach(player => {
                        player.send(JSON.stringify({ message: `Player ${winner} wins the game!` }));
                    });
                    scores = [0, 0];
                }

                players.forEach(player => delete player.choice);
            }
        }

        players.forEach(player => {
            if (player !== ws && player.readyState === WebSocket.OPEN) {
                player.send(JSON.stringify(parsedMessage));
            }
        });
    });

    ws.on('close', () => {
        console.log('Player disconnected');
        players = players.filter(player => player !== ws);

        if (players.length === 1) {
            players[0].send(JSON.stringify({ message: 'Opponent disconnected. Waiting for a new opponent...' }));
            scores = [0, 0];
        }
    });
});

server.listen(8080, () => {
    console.log('Server is listening on port 8080');
});
