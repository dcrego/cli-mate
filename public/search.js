(function () {
    function search(query) {
        var id =  cityIds[query];
        if (id) {
            updateWeather(id);
            updateForecast(id);
        }
    }
    const searchBox = $('#searchBox')[0];
    const searchButton = $('#searchButton')[0];
    searchButton.onclick = (evt) => {
        search(searchBox.value);
    };
    searchBox.onkeyup = (evt) => {
        if (evt.keyCode == 13) {
            search(searchBox.value);
        }
    };
})();