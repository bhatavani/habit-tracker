const express = require('express');
const bodyParser = require('body-parser');
const habitRoutes = require('./routes/habitRoutes');
const scheduleReminders = require('./utils/reminder');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use('/api', habitRoutes);

// Serve logs as static files
app.use('/logs', express.static(path.join(__dirname, 'logs')));

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

scheduleReminders(server);
