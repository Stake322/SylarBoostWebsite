const mongoose = require('mongoose')

const requestSchema = mongoose.Schema({
    requstType: String,
    currentValue: String,
    newValue: Number, 
    infoParty: String, 
    infoStream: String, 
    infoHeros: String, 
    cleanResult: Number, 
    result: Number, 
    promo: String,
    contact: String,
    count: Number,
    value: String
})


const RequestSchema = mongoose.model('Request', requestSchema)

module.exports = RequestSchema