import Dog from "./Dog";
const dog = new Dog();

export default class Ad{
    constructor(api_key){
        this.apiKey = api_key;

        // check if weather is in local storage
        if(
            localStorage.getItem('weather') && 
            Date.now() - localStorage.getItem('timestamp') < 60000
        ){
            // get weather from local storage
            const weatherData = JSON.parse(localStorage.getItem('weather'));
            this.displayWeather(weatherData);
        }
        else{
            this.getLocation();
        }

    }

    getLocation(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.getWeather.bind(this));
        }else{
            alert('Location not supported');
        }
    }

    getWeather(position){
        console.log(position);
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;

        fetch(url)
        .then(response => response.json())
        .then(weatherdata => {
            //console.log(data);
            //local storage string naar json en json naar string denk ik
            localStorage.setItem('weather', JSON.stringify(weatherdata));
            // save timestamp
            localStorage.setItem('timestamp', Date.now()); 
            this.displayWeather(weatherdata);
        });
    }

    displayWeather(weatherdata) {
        if (weatherdata.weather[0].main == "Clouds") {
            //set background of #ad to 'cloudy' dog
            dog.getDog('pomeranian');
            //set describtion to 'oops'
            document.querySelector('.discribtion').innerText = "Oh nee, het is bewolkd vandaag! Haal vandaag nog het zonnetje in huis!";
        }
        else if (weatherdata.weather[0].main == "Rain" || weatherdata.weather[0].main == "Drizzle" || weatherdata.weather[0].main == "Thunderstorm") {
            //set background of #ad to 'rainy' dog
            dog.getDog('redbone');
            //set describtion to 'oops'
            document.querySelector('.discribtion').innerText = "Oh nee, het regent vandaag! Haal vandaag nog het zonnetje in huis!";
        }
        else if (weatherdata.weather[0].main == "Clear") {
            //set background of #ad to 'clear' dog
            dog.getDog('appenzeller');
            //set describtion to 'oops'
            document.querySelector('.discribtion').innerText = "Het is mooi weer vandaag! Ga vandaag nog wandelen met je nieuwe hond!";
        }
        else if (weatherdata.weather[0].main == "Snow") {
            //set background of #ad to 'snowy' dog
            dog.getDog('chow');
            //set describtion to 'oops'
            document.querySelector('.discribtion').innerText = "Oh nee, het sneeuwd vandaag! Haal vandaag nog een warme hond in huis!";
        }
        else if (weatherdata.weather[0].main == "Mist" || weatherdata.weather[0].main == "Fog") {
            //set background of #ad to 'snowy' dog
            dog.getDog('beagle');
            //set describtion to 'oops'
            document.querySelector('.discribtion').innerText = "Oh het is lekker mistig vandaag! Haal vandaag nog een warme hond in huis!";
        }
        else {
            //set background of #ad to 'snowy' dog
            dog.getDog('brabancon');
            //set describtion to 'oops'
            document.querySelector('.discribtion').innerText = "Haal vandaag nog een nieuwe schattige hond in huis!";
        }
    }
}