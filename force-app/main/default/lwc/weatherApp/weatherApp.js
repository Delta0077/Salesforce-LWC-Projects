import { LightningElement } from 'lwc';
const API_KEY = '82a38d8ae9d310f88aa46de9f636748b'

export default class WeatherApp extends LightningElement {
    cityName = ''
    searchHandler(event) {
        this.cityName = event.target.value;
    }

    submitHandler(event) {
        event.preventDefault(); // Prevent the default form submission
        this.fetchData();
    }

    fetchData() {
        console.log('Fetching data for city:', this.cityName);
        // Fetch data from the weather API using the city name
    }
}