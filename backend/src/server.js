/* Anica Ferreira u24581802 */
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

const authRoutes = require('./routes/auth');
app.use(express.json());

app.use(express.static(path.join(__dirname, '../../frontend/public')));

app.use('/auth', authRoutes);

app.get('/api', (req, res) => {
    res.json({message: 'Hello from the backend!'});
});

//Wildcard api endpoint
app.get('/{*any}', (req, res) =>{
    res.sendFile(path.resolve(__dirname, '../../frontend/public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});