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

const front_url = 'http://localhost:3000'
app.use(
    cors({
        origin: process.env.FRONT_LOCATION, // <-- location of the react app were connecting to
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        // credentials: true,
    })
);
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




const config = {
    max_mmr : 7500,
    promocodes : ["MAMAUDOTA", "ABOBA2021", "TERRORBLADE"],
    price_modificators : {
        party_boost : 30,
        stream : 10,
        spec_heroes : 15,
        serv_NA : 30,
        serv_SEA : 40,
        promocode : 15
    },
    coach_rub : 600,
    coach_usd: 14
}
// new ConfigSchema(config).save()
