const mongoose = require('mongoose')

const configSchema = mongoose.Schema({
    max_mmr: Number,
    promocodes: [String],
    price_modificators: {
        party_boost: Number,
        stream: Number,
        spec_heroes: Number,
        serv_NA: Number,
        serv_SEA: Number,
        promocode: Number
    },
    coach_rub: Number,
    coach_usd: Number
})

const ConfigSchema = mongoose.model('Config', configSchema)

module.exports = ConfigSchema