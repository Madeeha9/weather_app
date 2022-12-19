let pos = {
    lat: -45,
    lon: 112, 
    Cname: ""
};

let weather = {
    "apiKey": '02cb241d4a039843891607d4ffbf297b',
    fetchLocation: function(city){
      pos.Cname = city;
      fetch("http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=5&appid=02cb241d4a039843891607d4ffbf297b")
      .then((response) => response.json()).then((data) => {
          pos.lat = data[0].lat
          pos.lon = data[0].lon
          this.fetchWeather()
      });
  },
    fetchWeather: function(){
        fetch("https://api.openweathermap.org/data/2.5/weather?lat="+pos.lat+"&lon="+pos.lon+"&units=metric&appid="+this.apiKey)
        
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);this.displayWeather(data)});
  },

  displayWeather: function (data) {
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + pos.Cname;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + pos.Cname + "')";
  },
  search: function () {
    this.fetchLocation(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchLocation("London");