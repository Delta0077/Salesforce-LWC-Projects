import { LightningElement } from 'lwc';
import WEATHER_ICONS from '@salesforce/resourceUrl/weatherAppIcons'; // Importing weather icons from static resources
import getWeatherDetails from '@salesforce/apex/weatherAppController.getWeatherDetails';

export default class WeatherApp extends LightningElement {

    // Importing icons from static resources
    clearIcon = WEATHER_ICONS +'/weatherAppIcons/clear.svg'
    cloudIcon = WEATHER_ICONS +'/weatherAppIcons/cloud.svg'
    dropletIcon = WEATHER_ICONS +'/weatherAppIcons/droplet.svg'
    hazeIcon = WEATHER_ICONS +'/weatherAppIcons/haze.svg'
    rainIcon = WEATHER_ICONS +'/weatherAppIcons/rain.svg'
    snowIcon = WEATHER_ICONS +'/weatherAppIcons/snow.svg'
    thunderstormIcon = WEATHER_ICONS +'/weatherAppIcons/storm.svg'
    mapIcon = WEATHER_ICONS +'/weatherAppIcons/map.svg'
    thermometerIcon = WEATHER_ICONS +'/weatherAppIcons/thermometer.svg'
    arrowBackIcon = WEATHER_ICONS +'/weatherAppIcons/arrow-back.svg'


    cityName = ''
    loadingText = ''
    isError = false
    response
    weatherIcon
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
        getWeatherDetails({input: this.cityName}).then(result => {
            this.weatherDetails(JSON.parse(result)); // This method should be defined to handle the weather data
        }).catch((err) => { // Handle API or Server related erros here
            console.error('Error fetching weather data:', err);
            this.response = null
            this.loadingText = 'Error fetching weather data. Please try again.';
            this.isError = true;
            // Optionally, you can display an error message to the user
            // or handle the error in a way that suits your application
            // Handle the error accordingly
        })

        // Below is client-side code to fetch data from the OpenWeatherMap API
        /*const URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${API_KEY}&units=metric`

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
        })*/
    }

    // Error handling method for wrong/invalid city names
    weatherDetails(info) {
        if(info.cod === '404') {
            this.isError = true;
            this.loadingText = `${this.cityName} not found. Please try again.`; // Display an error message to the user
        } else {
            this.loadingText = '';
            this.isError = false;
            
            const city = info.name // City name
            const country = info.sys.country // Country code
            const {description, id}= info.weather[0] // Weather description and ID
            const {temp, feels_like, humidity} = info.main // Main weather data

            // Set the weather icon based on the weather ID
            if(id === 800) {
                this.weatherIcon = this.clearIcon
            } else if(id >=801 && id <=804) {
                this.weatherIcon = this.cloudIcon
            } else if(id >= 701 && id <= 781) {
                this.weatherIcon = this.hazeIcon
            } else if(id >= 600 && id <= 622) {
                this.weatherIcon = this.snowIcon
            } else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
                this.weatherIcon = this.rainIcon
            } else if(id >= 200 && id <= 232) {
                this.weatherIcon = this.thunderstormIcon
            }

            // getting response data
            this.response = {
                location: `${city}, ${country}`,
                description: description,
                id: id,
                temp: `${Math.floor(temp)}℃`,
                feels_like: Math.floor(feels_like),
                humidity: `${humidity}%`
            }
        }

    }

    // Method to clear the input field and reset the weather data
    clearInput() {
        this.cityName = '';
        this.response = undefined;
        this.loadingText = '';
        this.isError = false;
        this.weatherIcon = undefined;
    }
}