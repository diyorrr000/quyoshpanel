const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const _ = require('lodash');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Fake Data State
let systemState = {
    totalHealth: 98.4,
    liveGridOutput: 14.2,
    ambientTemp: 28,
    activePanels: 48,
    totalPanels: 48,
    batteryLevel: 85,
    batteryTemp: 32,
    solarEfficiency: 94.2,
    panels: Array.from({ length: 48 }, (_, i) => ({
        id: 101 + i,
        efficiency: (Math.random() * (98 - 85) + 85).toFixed(1),
        voltage: (Math.random() * (25 - 23) + 23).toFixed(1),
        temp: (Math.random() * (35 - 25) + 25).toFixed(1),
        status: Math.random() > 0.1 ? 'online' : 'maintenance'
    }))
};

// Data Generator Loop
setInterval(() => {
    systemState.liveGridOutput = +(systemState.liveGridOutput + (Math.random() * 0.2 - 0.1)).toFixed(2);
    systemState.ambientTemp = +(systemState.ambientTemp + (Math.random() * 0.1 - 0.05)).toFixed(1);
    systemState.batteryLevel = systemState.batteryLevel < 100 ? +(systemState.batteryLevel + 0.01).toFixed(2) : 100;

    systemState.panels = systemState.panels.map(p => ({
        ...p,
        efficiency: +(+p.efficiency + (Math.random() * 0.4 - 0.2)).toFixed(1),
        voltage: +(+p.voltage + (Math.random() * 0.2 - 0.1)).toFixed(1),
    }));

    io.emit('vitals_update', systemState);
}, 2000);

// API Routes
app.get('/api/vitals', (req, res) => {
    res.json(systemState);
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    // Simple mock auth
    if (email && password) {
        res.json({
            success: true,
            token: "mock-jwt-token",
            user: { name: "System Operator", role: "admin" }
        });
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
});

app.get('/api/statistics', (req, res) => {
    res.json({
        daily: [20, 45, 75, 90, 65, 30, 10],
        weekly: [120, 150, 180, 210, 190, 140, 110],
        monthly: [3200, 3500, 3800, 4100, 3900, 3400, 3100]
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Solar_OS Core Backend running on port ${PORT}`);
});
