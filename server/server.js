const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

const games = new Map();
const players = new Map();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/api/health', (req, res) => {
    res.json({ status: '✅ Server is running' });
});

app.post('/api/create-game', (req, res) => {
    const { gameType } = req.body;
    const gameId = uuidv4();
    
    games.set(gameId, {
        id: gameId,
        type: gameType,
        players: [],
        state: 'waiting',
        createdAt: new Date()
    });
    
    res.json({ gameId, message: '✅ Game created' });
});

app.get('/api/game/:gameId', (req, res) => {
    const game = games.get(req.params.gameId);
    if (!game) {
        return res.status(404).json({ error: '❌ Game not found' });
    }
    res.json(game);
});

io.on('connection', (socket) => {
    console.log(`✅ Player connected: ${socket.id}`);
    
    socket.on('joinGame', (data) => {
        const { gameId, playerName } = data;
        const game = games.get(gameId);
        if (game) {
            const player = { id: socket.id, name: playerName, socketId: socket.id };
            players.set(socket.id, player);
            game.players.push(player);
            socket.join(gameId);
            socket.emit('joinedGame', { gameId, players: game.players });
            io.to(gameId).emit('playerJoined', player);
        }
    });
    
    socket.on('playerAction', (data) => {
        const { gameId, action, payload } = data;
        io.to(gameId).emit('playerAction', { playerId: socket.id, action, payload });
    });
    
    socket.on('gameUpdate', (data) => {
        const { gameId } = data;
        io.to(gameId).emit('gameUpdate', data);
    });
    
    socket.on('disconnect', () => {
        const player = players.get(socket.id);
        if (player) {
            console.log(`👋 ${player.name} disconnected`);
            players.delete(socket.id);
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🎮 WebSocket ready for connections`);
});
