import { LightningElement } from 'lwc';
import { countryCodeList } from 'c/countryCodeList';
import currencyConverterAssets from '@salesforce/resourceUrl/currencyConverterAssets';

export default class CurrencyConverter extends LightningElement {
    currencyImage = currencyConverterAssets + '/currencyConverterAssets/currency.svg';
    countryFrom = 'USD';
    countryTo = 'AUD';
    amount = '';
    result
    error
    countryList = countryCodeList;
    handleChange(event) {
        event.preventDefault();
        const { name, value} = event.target
        this[name] = value;
        this.result = '';
        this.error = '';
    }

    submitHandler(event) {
        event.preventDefault();
        this.convert();

    }

    async convert() {
        const API_KEY = '414fffa578df77c03e837139'; // Replace with your actual API key
        const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${this.countryFrom}/${this.countryTo}`;    
        try {
            const data = await fetch(API_URL);
            const jsonData = await data.json();
            this.result = (Number(this.amount) * jsonData.conversion_rate).toFixed(2);
            console.log(this.result)
        } catch(error) {
            console.log('Error:', error);
            this.error = 'An error occurred while fetching the conversion rate.';
        }
    }
}
