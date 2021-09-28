// const config = require('./this.config.json');

export default class BoostCalc {
    constructor(config) {
        this.config = config;
    }

    calculate(currency, from, to, party, stream, server, specHeroes, promocode) {
        //Variables
        var result = 0;
        var cleanRes = 0;

        //Settings

        const totalMMR = (to - from)

        // Idiotentest
        if (totalMMR === null || totalMMR < 0) {
            result = -1
        } else if (to > this.config.max_mmr) {
            result = '🦄 For such a boost, please ask some Pro-Players'
        } else if (from > this.config.max_mmr) {
            result = '🦄 What a pro, do you want to work with us?'
        } else {
            //Calculation
            const obj = this.internalCalc(currency, from, to, party, stream, server, specHeroes, promocode);
            //console.log(obj)
            result = obj.result
            cleanRes = obj.cleanResult
        }
        if (typeof result === 'string' || result instanceof String) {
        } else if (result === -1) {
            result = 0
        } else {
            result = parseFloat(result).toFixed(0);
            cleanRes = parseFloat(cleanRes).toFixed(0);
        }

        return { result : result, cleanResult: cleanRes };
    }


    internalCalc(currency, from, to, party, stream, server, specHeroes, promocode) {
        var result = 0;
        const totalMMR = (to - from)

        var value = from;
        while (value != to) {
            result += this.getPrice(value, currency);
            value++;
        }

        const cleanResult = result

        //console.log(`Price: ${result}. Before modificators`)
        if (party === true) {
            result *= (100+this.config.price_modificators.party_boost)/100
            //console.log(`Price: ${result}. After party`)
        }
            if (stream === true) {
                result *= (100+this.config.price_modificators.stream)/100
            }
            //console.log(`Price: ${result}. After stream`)
      
        if (specHeroes === true) { result *= (100+this.config.price_modificators.spec_heroes)/100 }
        //console.log(`Price: ${result}. After specHeroes`)

        if (server === 'SEA') { result *= (100+this.config.price_modificators.serv_SEA)/100 } else
        if (server === 'NA') { result *= (100+this.config.price_modificators.serv_NA)/100 }
        //console.log(`Price: ${result}. After regions`)

        if ( this.config.promocodes.includes(promocode) ) {
            result *= (100-this.config.price_modificators.promocode)/100
        }
        //console.log(`Price: ${result}. After promocodes`)

        return { result : result, cleanResult: cleanResult };
    }

    getPrice(mmr, currency) {
        if (currency == 'RUB') {
            if (mmr < 2000) { return 1.4; } else
            if (mmr < 3000) { return 1.8; } else
            if (mmr < 3500) { return 2.3; } else
            if (mmr < 4000) { return 3.3; } else
            if (mmr < 4500) { return 4.0; } else
            if (mmr < 5000) { return 5.0; } else
            if (mmr < 5500) { return 7.0; } else
            if (mmr < 6000) { return 13.0; } else
            if (mmr < 6500) { return 21.0; } else
            if (mmr < 7000) { return 35.0; } else
            if (mmr <= 7500) { return 70.0; } 
        } else {
            if (mmr < 2000) { return 0.02; } else
            if (mmr < 3000) { return 0.03; } else
            if (mmr < 3500) { return 0.04; } else
            if (mmr < 4000) { return 0.05; } else
            if (mmr < 4500) { return 0.06; } else
            if (mmr < 5000) { return 0.075; } else
            if (mmr < 5500) { return 0.12; } else
            if (mmr < 6000) { return 0.185; } else
            if (mmr < 6500) { return 0.32; } else
            if (mmr < 7000) { return 0.47; } else
            if (mmr <= 7500) { return 0.97; }
        }
    }

}


