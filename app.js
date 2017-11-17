const http = require("http");
const location = process.argv.slice(2);

function message(state, city, temp) {
  console.log(`It is ${temp}˚ degrees in ${city}, ${state}!`);
}

if (location.length <= 1) {
  console.log("Type the file path to the code followed by the name of your city SPACE and then the name of your state :)");
} else {
  http.get(`http://api.wunderground.com/api/API_KEY/conditions/q/${location[1]}/${location[0]}.json`, response => {
    let body = "";

    response.on("data", data => {
      body += data.toString();
    });

    response.on("end", () => {
      const currentWeather = JSON.parse(body);
      const weather = {
        state: currentWeather.current_observation.display_location.state_name,
        city: currentWeather.current_observation.display_location.city,
        temp: Math.round(currentWeather.current_observation.temp_f),
      };

      message(weather.state, weather.city, weather.temp);
    });
  });
}
