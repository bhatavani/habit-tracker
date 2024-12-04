const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataPath = path.resolve(__dirname, '../data/habits.json');

// Utility to read/write habits
const readHabits = () => JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
const writeHabits = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

// Add a new habit
router.post('/habits', (req, res) => {
    const { name, daily_goal } = req.body;
    const date = new Date().toISOString().split('T')[0];

    const habits = readHabits();
    const newHabit = { id: habits.length + 1, name, daily_goal, completion_status: 0, date };
    habits.push(newHabit);

    writeHabits(habits);
    res.status(201).json({ status: 'success', data: newHabit });
});

// Mark habit as complete
router.put('/habits/:id', (req, res) => {
    const { id } = req.params;

    const habits = readHabits();
    const habit = habits.find((h) => h.id === parseInt(id));

    if (!habit) {
        return res.status(404).json({ status: 'error', error: 'Habit not found' });
    }

    habit.completion_status = 1;
    writeHabits(habits);

    res.json({ status: 'success', message: 'Habit marked complete', data: habit });
});

// Get all habits
router.get('/habits', (req, res) => {
    const habits = readHabits();
    res.json({ status: 'success', data: habits });
});

// Weekly report
router.get('/habits/report', (req, res) => {
    const habits = readHabits();
    const report = habits.map((habit) => ({
        name: habit.name,
        completed: habit.completion_status,
        date: habit.date,
    }));

    // Optional: Log the report to a file
    const logPath = path.resolve(__dirname, '../logs/weekly_reports.txt');
    fs.appendFileSync(logPath, JSON.stringify(report, null, 2) + '\n');

    res.json({ status: 'success', data: report });
});

module.exports = router;
