const express = require('express');
const bodyParser = require('body-parser');
const port = 8000;
const app = express();
const routes = require('./routes')
const userRoutes = require('./userRoutes')
const sqlite3 = require('sqlite3').verbose()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/login', userRoutes)
app.use('/api', routes)


app.listen(port, function() {
    console.log('listening on port', port)
})