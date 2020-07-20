const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=f48c67e7c1ae2ca7256a701174fedae2&query='+latitude+','+longitude
  request({ url, json: true}, (error, { body }) => {
    if(error){
      callback('Unable to connect to the weather app.', undefined)
    } else if(body.error) {
      callback('Unable to fetch co-ordinates', undefined)
    } else{
      callback(undefined,body.current.weather_descriptions[0] + ". It is "+ body.current.temperature+ " degree celcius outside. It feels like " + body.current.feelslike + " degree celcius. The humidity is "+body.current.humidity+"%.")
    }
  })
}

module.exports = forecast
