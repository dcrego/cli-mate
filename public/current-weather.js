var updateWeather;
(function () {
    const weather = {
        data: null
    }
    const currentWeatherContainer = $('#currentWeatherContainer');
    const currentWeather = $('#currentWeather');
    const appid = 'ea8fe85841834e341e0f0c4f16084dfd';
    const lang = 'es';
    const units = 'metric';
    updateWeather = function(id) {
        $.get(`http://api.openweathermap.org/data/2.5/weather?units=${units}&lang=${lang}&id=${id}&appid=${appid}`, (data, status) => {
            if (status == 'success') {
                weather.data = data;
                render();
            }
        });
    }
    function render() {
        if (weather.data.cod == 200) {
            currentWeatherContainer[0].style.background = `linear-gradient(transparent 60%, white 80%), url(/bg/${weather.data.weather[0].icon})`;
            currentWeatherContainer[0].title = weather.data.weather[0].description;
            currentWeather.find('#currentTemp').text(weather.data.main.temp);
            currentWeather.find('.m-humid').text(weather.data.main.humidity);
            currentWeather.find('.m-press').text(weather.data.main.pressure);
            currentWeather.find('.clouds').text(weather.data.clouds.all);
            var date = new Date(weather.data.dt * 1000);
            currentWeather.parent()[0].hidden = false;
            currentWeatherContainer.find('#lastUpdate').text(`${utils.formatDate(date)} ${utils.formatTime(date)}`);
        }
    }
})();
