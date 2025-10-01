/* Anica Ferreira 40_u24581802 */
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, '../../frontend/public'))); 

app.use('/uploadedImages', express.static(path.join(__dirname, '../uploadedImages')));

/* ROUTES */
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');
const activityRoutes = require('./routes/activities');
const imageRoutes = require('./routes/images');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/images', imageRoutes);

app.get(/.*/, (req, res) =>{
    res.sendFile(path.resolve(__dirname, '../../frontend/public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});