const apiKey = 'a2dda52dce059eb8a14e95aaa0db6ab7';

    function fetchWeather(location) {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const currentTemperature = data.main.temp;
          const currentDateTime = new Date().toLocaleString();

          // Update HTML elements with fetched data
          $('#currentLocation').text(location);
          $('#currentTemperature').text(currentTemperature);
          $('#currentTime').text(`It's ${currentDateTime}`);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    }

    // Event listener for each nav link
    $('.data-location').on('click', function (event) {
      event.preventDefault();
      const location = $(this).data('location');
      fetchWeather(location);
    });

    // Fetch initial weather data for the default location
    fetchWeather('Los Angeles');