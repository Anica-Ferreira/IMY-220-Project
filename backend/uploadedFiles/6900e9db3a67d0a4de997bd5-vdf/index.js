// Student details here
// p1_u24581802
const app = require('express')();

const path = require('path');
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, 'html/index.html'));
})

app.get('/date', (req, res) => {
    return res.json({ date: new Date() });
})

app.get('/ping', (req, res) => {
    return res.json({ message: 'pong' });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
