require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');


/****** Import configuration (DB & cors) */
require('./src/config/database');
const cors = require('./src/config/cors');

/*** Import routes */
const userRoutes = require('./src/routes/userRoutes');

const app = express();
/* Use middlewars */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors);


/*  Routes */
app.use('/api/users', userRoutes);


app.listen(process.env.PORT, ()=> console.log(`Listening on ${process.env.PORT}`));
console.log(new Date())