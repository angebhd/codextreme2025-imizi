require('dotenv').config();
const express = require('express');
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


const app = express();
/* Use middlewars */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors);
app.use(passport.initialize());



/*  Routes */
app.use('/api/users', userRoutes);
app.use('/api/family', familyRoutes);
app.use('/api/task', taskRoutes);


app.listen(process.env.PORT, ()=> console.log(`Listening on ${process.env.PORT}`));
console.log(new Date())