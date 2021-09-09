const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const bodyParser = require('body-parser')
const RequestSchema = require('./RequestSchema.js')
require('dotenv').config()

const ConfigSchema = require('./ConfigSchema.js')

const app = express()

const db_string = 'mongodb+srv://User:aboba322@mycluster.g4hz9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(
    db_string,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log("Mongoose Is Connected");
    }
);
mongoose.set('useFindAndModify', false)

app.use(cors({}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------
app.get('/boost', (req, res, next) => {
    ConfigSchema.find((err, config) => {
        if (err) throw err
        if (!config) res.send('No config found')
        res.send(config)
    })
})

app.post('/create-request', (req, res, next) => {
    const newRequest = new RequestSchema(req.body)
    newRequest.save();
    res.send(200)
})

const PORT = 3001
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
