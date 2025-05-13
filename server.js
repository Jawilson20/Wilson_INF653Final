const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');

dotenv.config();

// Log MONGO_URI to check if it is loaded correctly
console.log('MongoDB URI:', process.env.MONGO_URI);
// Check if MONGO_URI is defined

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static HTML welcome page
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api', require('./routes/index'));

// Catch-all for unknown routes
app.use((req, res) => {
  const accept = req.headers.accept || '';
  if (accept.includes('text/html')) {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
  } else if (accept.includes('application/json')) {
    res.status(404).json({ error: '404 Not Found' });
  } else {
    res.status(404).send('404 Not Found');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
