const express = require('express');
const cors = require('cors');
require('dotenv').config();

const charactersRoutes = require('./routes/characters');
const eventsRoutes = require('./routes/events');
const countriesRoutes = require('./routes/countries');
const representativesRoutes = require('./routes/representatives');
const flowersRoutes = require('./routes/flowers');
const sessionsRoutes = require('./routes/sessions');
const feedbackRoutes = require('./routes/feedback');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Shakespeare Erasmus API running on localhost'
  });
});

app.use('/characters', charactersRoutes);
app.use('/events', eventsRoutes);
app.use('/countries', countriesRoutes);
app.use('/representatives', representativesRoutes);
app.use('/flowers', flowersRoutes);
app.use('/sessions', sessionsRoutes);
app.use('/feedback', feedbackRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

