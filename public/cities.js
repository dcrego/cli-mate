(function () {
    cityIds = {};
    $.get('./owm/city.list.json', (data, status) => {
        if (status=='success') {
            var cities = $('#cities')[0];
            clearElement(cities);
            for (var city of data) {
                var opt = document.createElement('option');
                var text = `${city.name}, ${city.country} (${city.coord.lat},${city.coord.lon})`;
                cityIds[text] = city.id;
                opt.setAttribute('value', text);
                cities.appendChild(opt);
            }
        }
    });
})();
