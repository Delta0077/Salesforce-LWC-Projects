import { LightningElement } from 'lwc';
const API_KEY = '82a38d8ae9d310f88aa46de9f636748b'

export default class WeatherApp extends LightningElement {
    cityName = ''
    loadingText = ''
    searchHandler(event) {
        this.cityName = event.target.value;
    }

    submitHandler(event) {
        event.preventDefault(); // Prevent the default form submission
        this.fetchData();
    }

    fetchData() {
        this.loadingText = 'Fetching weather data...';
        console.log('Fetching data for city:', this.cityName);
        // Fetch data from the weather API using the city name

        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${API_KEY}&units=metric`

        fetch(URL).then(res=> res.json()).then(result => {
            console.log(JSON.stringify(result));
            this.loadingText = '';
        }).catch((err) => {
            console.error('Error fetching weather data:', err);
            this.loadingText = 'Error fetching weather data. Please try again.';
            // Handle the error accordingly
        })
    }
}