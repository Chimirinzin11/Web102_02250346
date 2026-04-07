const express = require('express');
const dotenv  = require('dotenv');
const morgan  = require('morgan');
const cors    = require('cors');
const helmet  = require('helmet');
const path    = require('path');

dotenv.config();
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(require('./middleware/formatResponse'));

app.use(express.static('public'));
app.get('/api-docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'docs.html'));
});

app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));

app.get('/', (req, res) => res.json({ message: 'Welcome to Social Media API' }));

// app.use(require('./middleware/formatResponse'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  process.exit(1);
});