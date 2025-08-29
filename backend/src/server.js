/* Anica Ferreira u24581802 */
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../frontend/public')));

//Api endpoints:
app.post('/auth/signin', (req, res) => {
    res.json({
        email: "example@gmail.com"
    })
});

app.get('/api', (req, res) => {
    res.json({message: 'Hello from the backend!'});
});

//Wildcard api endpoint
app.get('/{*any}', (req, res) =>{
    res.sendFile(path.resolve(__dirname, '../frontend/public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});