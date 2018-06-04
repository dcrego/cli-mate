var updateForecast;
(function () {
    const forecast = {
        page: 0,
        data: null
    };
    const appid = 'ea8fe85841834e341e0f0c4f16084dfd';
    const lang = 'es';
    const forecastE = $('#forecast');
    updateForecast = function(id) {
        $.get(`http://api.openweathermap.org/data/2.5/forecast?lang=${lang}&id=${id}&appid=${appid}`, (data, status) => {
            if (status == 'success') {
                forecast.data = data;
                render();
            }
        });
    }
    function composePath(points) {
        var path = '';
        var primitive = 'M';
        for (var point of points) {
            path += `${primitive} ${point[0]} ${point[1]} `;
            primitive = 'L';
        }
        return path + 'Z';
    }
    function render() {
        if (!forecast.data) {
            return false;
        }
        var data = forecast.data.list.slice(forecast.page * 8, forecast.page * 8 + 8);
        // Find elements
        const svgE = forecastE.find('svg');
        const precipitations = svgE.find('#precipitations')[0];
        const minTemp = svgE.find('#minTemp')[0];
        const maxTemp = svgE.find('#maxTemp')[0];
        const tempPath = svgE.find('path')[0];
        const icons = forecastE.find('#icons')[0];
        const times = forecastE.find('#times')[0];
        const fd = forecastE.find('#firstDate')[0];
        const ld = forecastE.find('#lastDate')[0];
        // Reset
        utils.clearElement(precipitations);
        utils.clearElement(minTemp);
        utils.clearElement(maxTemp);
        utils.clearElement(icons);
        utils.clearElement(times);
        // Boundaries
        var boundaries = {
            volume: {
                max: 0.0
            },
            temp: {
                min: 2000,
                max: 0
            }
        };
        for (var chunk of data) {
            // Precipitations
            chunk.volume = 0.0;
            if (chunk.rain && chunk.rain['3h']) {
                chunk.volume += chunk.rain['3h'];
            }
            if (chunk.snow && chunk.snow['3h']) {
                chunk.volume += chunk.snow['3h'];
            }
            if (chunk.volume > boundaries.volume.max) {
                boundaries.volume.max = chunk.volume;
            }
            // Temperature
            if (chunk.main.temp_min < boundaries.temp.min) {
                boundaries.temp.min = chunk.main.temp_min;
            }
            if (chunk.main.temp_max > boundaries.temp.max) {
                boundaries.temp.max = chunk.main.temp_max;
            }
        }
        boundaries.temp.dif = boundaries.temp.max - boundaries.temp.min;
        // Fill
        var tempPoints = {
            min: [],
            max: []
        };
        for (var i in data) {
            i = parseInt(i);
            chunk = data[i];
            // Precipitations
            if (boundaries.volume.max > 0.0) {
                var h = 2.0 * chunk.volume / boundaries.volume.max;
                var p = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
                p.setAttribute('x', i + 0.1);
                p.setAttribute('y', 2.1 - h);
                p.setAttribute('width', 0.8);
                p.setAttribute('height', h);
                p.setAttribute('fill-opacity', 0.9);
                precipitations.appendChild(p);
            }
            // Temperature
            if (boundaries.temp.min < boundaries.temp.max) {
                // Min temperature
                var mintcy = 2.0 * (chunk.main.temp_min - boundaries.temp.min) / boundaries.temp.dif;
                mintcy = 2.1 - mintcy;
                var mint = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
                var mintcx = i + 0.5;
                mint.setAttribute('cx', mintcx);
                mint.setAttribute('cy', mintcy);
                mint.setAttribute('r', 0.075);
                minTemp.appendChild(mint);
                tempPoints.min.push([mintcx, mintcy]);
                // Max temperature
                var maxtcy = 2.0 * (chunk.main.temp_max - boundaries.temp.min) / boundaries.temp.dif;
                maxtcy = 2.1 - maxtcy;
                var maxt = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
                var maxtcx = i + 0.5;
                maxt.setAttribute('cx', maxtcx);
                maxt.setAttribute('cy', maxtcy);
                maxt.setAttribute('r', 0.075);
                maxTemp.appendChild(maxt);
                tempPoints.max.push([maxtcx, maxtcy]);
                // Both
                if (Math.abs(maxtcy - mintcy) < 0.001) {
                    mint.setAttribute('fill', 'darkviolet');
                    maxt.setAttribute('fill', 'darkviolet');
                }
            }
            // Icons
            var icon = document.createElement('img');
            icon.src = utils.getIconUrl(chunk.weather[0].icon);
            var container = document.createElement('div');
            container.className = "center-aligned growing";
            container.appendChild(icon);
            icons.appendChild(container);
            // Times
            chunk.date = new Date(chunk.dt * 1000);
            var t = document.createElement('div');
            t.className = 'center-aligned growing';
            t.innerText = utils.formatTime(chunk.date);
            times.appendChild(t);
        }
        var points = [];
        points = points.concat(tempPoints.min);
        points.reverse();
        points = points.concat(tempPoints.max);
        tempPath.setAttribute('d', composePath(points));
        fd.innerText = utils.formatDate(data[0].date);
        ld.innerText = utils.formatDate(data[7].date);
        forecastE[0].hidden = false;
        return true;
    }
    function nextPage() {
        if (forecast.page < 4) {
            forecast.page++;
        }
        render();
    }
    function prevPage() {
        if (forecast.page > 0) {
            forecast.page--;
        }
        render();
    }
    var navigationButtons = $('#forecast .navigation');
    navigationButtons[0].onclick = prevPage;
    navigationButtons[1].onclick = nextPage;
})();
