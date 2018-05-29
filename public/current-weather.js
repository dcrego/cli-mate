const sample = {
    "coord": {
        "lon": 145.77,
        "lat": -16.92
    },
    "weather": [
        {
            "id": 802,
            "main": "Clouds",
            "description": "scattered clouds",
            "icon": "03n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 300.15,
        "pressure": 1007,
        "humidity": 74,
        "temp_min": 300.15,
        "temp_max": 300.15
    },
    "visibility": 10000,
    "wind": {
        "speed": 3.6,
        "deg": 160
    },
    "clouds": {
        "all": 40
    },
    "dt": 1485790200,
    "sys": {
        "type": 1,
        "id": 8166,
        "message": 0.2064,
        "country": "AU",
        "sunrise": 1485720272,
        "sunset": 1485766550
    },
    "id": 2172797,
    "name": "Cairns",
    "cod": 200
};
const currentWeather = $('#currentWeather');
if (sample.cod==200) {
    currentWeather.find('.w-icon').attr('src', `https://openweathermap.org/img/w/${sample.weather[0].icon}.png`);
    currentWeather.find('.w-description').text(sample.weather[0].description);
    var temp = sample.main.temp;
    currentWeather.find('.m-temp-k').text(temp);
    temp = temp - 273.15;
    currentWeather.find('.m-temp-c').text(temp);
    currentWeather.find('.m-humid').text(sample.main.humidity);
    currentWeather.find('.m-press').text(sample.main.pressure);
    currentWeather.find('.wind-s').text(sample.wind.speed);
    currentWeather.find('.wind-r').text(sample.wind.deg);
    currentWeather.find('.clouds').text(sample.clouds.all);
    var time = {h:0, m:0, s:sample.dt};
    time.m = Math.floor(time.s/60);
    time.s %= 60;
    time.h = Math.floor(time.m / 60);
    time.m %= 60;
    time.h %= 24;
    for (const key in time) {
        var s = time[key].toString();
        if (s.length<2) {
            s = '0'+s;
        }
        time[key] = s;
    }
    currentWeather.find('.time').text(`${time.h}:${time.m}:${time.s}`);
}
