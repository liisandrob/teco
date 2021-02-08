const express = require('express');
const config = require('config');
const morgan = require('morgan');
const path = require('path');

const { mongoose } = require('./database.js')

const app = express();

// Config
app.set('port', config.get('port'))

// Middlewares

app.use(morgan('dev'));
app.use(express.json());

// Routes

app.use('/api/users', require('./routes/user.routes.js'))

// Static files

app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
});