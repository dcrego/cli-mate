const utils = {
    clearElement: function (e) {
        while (e.firstChild) {
            e.removeChild(e.firstChild);
        }
    },
    getIconUrl: function (icon) {
        return `https://openweathermap.org/img/w/${icon}.png`;
    },
    formatTime: function (date) {
        var m = date.getMinutes().toString();
        if (m.length < 2) {
            m = '0' + m;
        }
        var h = date.getHours().toString();
        if (h.length < 2) {
            h = '0' + h;
        }
        return `${h}:${m}`;
    },
    formatDate: function (date) {
        var d = date.getDate();
        var m = date.getMonth();
        m = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'][m];
        var y = date.getFullYear();
        return `${d} ${m} ${y}`
    },
    formatCelsius(kelvin) {
        return (kelvin - 273.15).toFixed(2);
    }
}
