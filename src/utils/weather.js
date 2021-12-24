const request = require("request");

const forecast = (val1, val2, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=7a1820f23cda8a819470a28388ed82f5&query=" +
    val1 +
    "," +
    val2 +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    //in case of error in future like undefined add ={} in front of body
    //using object destructuring else use response in place of { body } object
    if (error) {
      callback("Unable to connect", undefined);
    } else if (body.error) {
      callback("Please add a valid location", undefined);
    } else {
      callback(
        undefined,
        "temperature is " +
          body.current.temperature +
          " feels like " +
          body.current.feelslike +
          " weather desc " +
          body.current.weather_descriptions[0]
      );
    }
  });
};

module.exports = forecast;
