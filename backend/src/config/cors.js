const cors = require('cors');

const corsOptions = {
  origin: '*',  // Adjust according to your needs
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = cors(corsOptions);