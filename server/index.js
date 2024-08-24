const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const loginRouter = require('./routes/login_routes'); // Adjusted variable name to match common conventions

const app = express();
const apiPort = process.env.PORT || 8080;

// MongoDB connection string
const uri = `mongodb+srv://suhaskubasad20:suhas8431@cluster0.dfmgg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', loginRouter);

// Serve React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Start server
app.listen(apiPort, () => console.log(`Server started at port ${apiPort}`));

// MongoDB connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connection disconnected');
});
