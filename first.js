const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Express.js Web Service!' });
});

app.get('/greet/:name', (req, res) => {
    res.json({ message: `Hello, ${req.params.name}!` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
