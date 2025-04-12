import { LightningElement } from 'lwc';
import WEATHER_ICONS from '@salesforce/resourceUrl/weatherAppIcons'; // Importing weather icons from static resources
const API_KEY = '82a38d8ae9d310f88aa46de9f636748b'

export default class WeatherApp extends LightningElement {

    clearIcon = WEATHER_ICONS +'/weatherAppIcons/clear.svg'
    cloudIcon = WEATHER_ICONS +'/weatherAppIcons/cloud.svg'
    dropletIcon = WEATHER_ICONS +'/weatherAppIcons/droplet.svg'
    hazeIcon = WEATHER_ICONS +'/weatherAppIcons/haze.svg'
    mapIcon = WEATHER_ICONS +'/weatherAppIcons/map.svg'
    rainIcon = WEATHER_ICONS +'/weatherAppIcons/rain.svg'
    snowIcon = WEATHER_ICONS +'/weatherAppIcons/snow.svg'
    thunderstormIcon = WEATHER_ICONS +'/weatherAppIcons/storm.svg'
    thermometerIcon = WEATHER_ICONS +'/weatherAppIcons/thermometer.svg'
    arrowBackIcon = WEATHER_ICONS +'/weatherAppIcons/arrow-back.svg'


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
        }).catch((err) => { // Handle API or Server related erros here
            console.error('Error fetching weather data:', err);
            this.loadingText = 'Error fetching weather data. Please try again.';
            this.isError = true;
            // Optionally, you can display an error message to the user
            // or handle the error in a way that suits your application
            // Handle the error accordingly
        })
    }

    // Error handling method for wrong/invalid city names
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