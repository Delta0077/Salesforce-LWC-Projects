import { LightningElement } from 'lwc';
import { countryCodeList } from 'c/countryCodeList';
import currencyConverterAssets from '@salesforce/resourceUrl/currencyConverterAssets';

export default class CurrencyConverter extends LightningElement {
    currencyImage = currencyConverterAssets + '/currencyConverterAssets/currency.svg';
    countryFrom = 'USD';
    countryTo = 'AUD';
    countryList = countryCodeList;
    handleChange(event) {
        event.preventDefault();
        const { name, value} = event.target
        this[name] = value;
    }

    submitHandler(event) {
        event.preventDefault();
        this.convert();

    }

    async convert() {
        const API_URL = `https://v6.exchangerate-api.com/v6/414fffa578df77c03e837139/pair/${this.countryFrom}/${this.countryTo}`;    
        try {
            const data = await fetch(API_URL);
            const jsonData = await data.json();
            console.log(jsonData)
        } catch(error) {
            console.log('Error:', error);
        }
    }
}
