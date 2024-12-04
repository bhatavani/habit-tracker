const WebSocket = require('ws');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

const dataPath = path.resolve(__dirname, '../data/habits.json');

const readHabits = () => JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const scheduleReminders = (server) => {
    const wss = new WebSocket.Server({ server });
    const clients = new Set();

    wss.on('connection', (ws) => {
        clients.add(ws);
        ws.on('close', () => clients.delete(ws));
    });

    cron.schedule('/1 * * * *', () => {
        const habits = readHabits().filter((h) => h.completion_status === 0);
        const message = JSON.stringify({ type: 'reminder', data: habits });

        clients.forEach((client) => client.send(message));
    });
};

module.exports = scheduleReminders;
