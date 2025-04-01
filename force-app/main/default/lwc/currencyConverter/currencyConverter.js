import { LightningElement } from 'lwc';
import { countryCodeList } from 'c/countryCodeList';

export default class CurrencyConverter extends LightningElement {
    countryFrom = 'USD';
    countryTo = 'AUD';
    countryList = countryCodeList;
    handleChange(event) {
        event.preventDefault();
        const { name, value} = event.target
        this[name] = value;
    }
}
