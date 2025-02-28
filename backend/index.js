require('dotenv').config();
const express = require('express');
const http = require("http");
const bodyParser = require('body-parser');

const passport = require('passport');

/****** Import configuration (DB & cors) */
require('./src/config/database');
require("./src/config/passport")
const cors = require('./src/config/cors');

/*** Import routes */
const userRoutes = require('./src/routes/userRoutes');
const familyRoutes = require('./src/routes/familyRoutes');
const taskRoutes = require('./src/routes/taskRoutes');

/* Create express and http server */
const app = express();
const server = http.createServer(app);

/* Use middlewars */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors);
app.use(passport.initialize());



/*  Routes */
app.use('/api/users', userRoutes);
app.use('/api/family', familyRoutes);
app.use('/api/task', taskRoutes);

/* Import and initialize websocket */

require("./src/services/locationServices")(server); // Pass `server` to WebSocket module



server.listen(process.env.PORT, ()=> console.log(`Listening on ${process.env.PORT}`));
console.log(new Date())