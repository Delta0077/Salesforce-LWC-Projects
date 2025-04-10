import { LightningElement } from 'lwc';
const API_KEY = '82a38d8ae9d310f88aa46de9f636748b'

export default class WeatherApp extends LightningElement {
    cityName = ''
    loadingText = ''
    isError = false
    searchHandler(event) {
        this.cityName = event.target.value;
    }

    get dynamicClasses() {
        return this.isError ? 'fetch-error' : 'fetch-success'; // This will apply the 'fetch-error' class if isError is true, otherwise 'fetch-success'
    }

    submitHandler(event) {
        event.preventDefault(); // Prevent the default form submission
        this.fetchData();
    }

    fetchData() {
        this.isError = false;
        this.loadingText = 'Fetching weather data...';
        console.log('Fetching data for city:', this.cityName);
        // Fetch data from the weather API using the city name

        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${API_KEY}&units=metric`

        fetch(URL).then(res=> res.json()).then(result => {
            console.log(JSON.stringify(result));

            this.weatherDetails(result); // This method should be defined to handle the weather data
        }).catch((err) => {
            console.error('Error fetching weather data:', err);
            this.loadingText = 'Error fetching weather data. Please try again.';
            this.isError = true;
            // Optionally, you can display an error message to the user
            // or handle the error in a way that suits your application
            // Handle the error accordingly
        })
    }
    weatherDetails(info) {
        if(info.cod === '404') {
            this.isError = true;
            this.loadingText = `${this.cityName} not found. Please try again.`; // Display an error message to the user
        } else {
            this.loadingText = '';
            this.isError = false;
        }
    }
}