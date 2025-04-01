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
}
