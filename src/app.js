const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utilis/geocodes.js')
const forecast = require('../utilis/forecast.js')

const app = express()

//Define Path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Define handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('',(req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Ashutosh'
  })
})

app.get('/about',(req, res) => {
  res.render('about', {
    title: 'All about me',
    name: 'Ashutosh'
  })
})

app.get('/help',(req, res) => {
  res.render('help', {
    title: "You'll find some help here",
    name: "Ashutosh"
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address){
    return res.send({
      error: 'You must provide an address!'
    })
  } else{
      geocode(req.query.address, (error, {latitude, longitude, location}= {}) => {
        if(error){
          return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData) => {
          if(error){
            return res.send({error})
          }
          res.send({
            forecast: forecastData,
            location: location,
            address: req.query.address
          })
        })
      })
    }
})

app.get('/product', (req, res) => {
  if (!req.query.search){
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*',(req, res) => {
  res.render('404', {
    title: '404',
    name: 'Ashutosh',
    errorMessage: 'HELP page not found'
  })
})

app.get('*',(req, res) => {
  res.render('404', {
    title: '404',
    name: 'Ashutosh',
    errorMessage: 'Page not found'
  })
})

app.listen(3000,() => {
  console.log('Server is up on the port 3000!')
})
