/* Anica Ferreira 40_u24581802 */
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../frontend/public')));

/* ROUTES */
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');
const activityRoutes = require('./routes/activities');

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use('/activities', activityRoutes);

app.get('/{*any}', (req, res) =>{
    res.sendFile(path.resolve(__dirname, '../../frontend/public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});