'use strict'

const Decimal = require('decimal.js');

class OBV {
    constructor(values) {
        this.values = values || [];
    }

    calculate(callback) {
        this.calculateOBV((err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    }

    calculateOBV(callback) {
        const data = [];
        const values = this.values;

        if (values && values.length) {
            values.forEach((val, idx) => {

                const prevPrice = idx ? values[idx - 1].price : values[idx].price;
                const prevVol = idx ? values[idx - 1].volume : values[idx].volume;

                if (val.price > prevPrice) {
                    data.push(val);
                    data[idx].obv = Decimal.add(val.volume, prevVol);
                }else if (val.price < prevPrice) {
                    data.push(val);
                    data[idx].obv = Decimal.sub(val.volume, prevVol);
                }else if (val.price === prevPrice) {
                    data.push(val);
                    data[idx].obv = prevVol;
                }
            });
        }
        return callback(null, data);
    }
}

module.exports = OBV;