/* Anica Ferreira 40_u24581802 */
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../../frontend/public')));

/* ROUTES */
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.get('/{*any}', (req, res) =>{
    res.sendFile(path.resolve(__dirname, '../../frontend/public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});