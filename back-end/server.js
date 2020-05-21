const express = require('express');
const bodyParser = require('body-parser');
const port = 8000;
const app = express();
const routes = require('./routes')
const userRoutes = require('./userRoutes')
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')

app.use(cors());
app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/users', userRoutes)
app.use('/api', routes)


app.listen(port, function() {
    console.log('listening on port', port)
})


module.exports = app;