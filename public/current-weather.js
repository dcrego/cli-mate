(function () {
    const weather = {
        data: null
    }
    const appid = 'ea8fe85841834e341e0f0c4f16084dfd';
    var id = 3109453;
    var lang = 'es';
    $.get(`http://api.openweathermap.org/data/2.5/weather?lang=${lang}&id=${id}&appid=${appid}`, (data, status) => {
        if (status == 'success') {
            weather.data = data;
            render();
        }
    });
    const currentWeather = $('#currentWeather');
    function render() {
        if (weather.data.cod == 200) {
            currentWeather.find('.w-icon').attr('src', utils.getIconUrl(weather.data.weather[0].icon));
            currentWeather.find('.w-description').text(weather.data.weather[0].description);
            var temp = weather.data.main.temp;
            currentWeather.find('.m-temp-k').text(temp);
            currentWeather.find('.m-temp-c').text(utils.formatCelsius(temp));
            currentWeather.find('.m-humid').text(weather.data.main.humidity);
            currentWeather.find('.m-press').text(weather.data.main.pressure);
            currentWeather.find('.wind-s').text(weather.data.wind.speed);
            currentWeather.find('.wind-r').text(weather.data.wind.deg);
            currentWeather.find('.clouds').text(weather.data.clouds.all);
            var date = new Date(weather.data.dt * 1000);
            currentWeather.find('.time').text(`${utils.formatDate(date)} ${utils.formatTime(date)}`);
        }
    }
})();
