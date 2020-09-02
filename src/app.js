const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsDir = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsDir)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

 
app.get('',(req, res) => {
    res.render('index',{
        title: "Weather App",
        name: 'Andrew Mead'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Naveen'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        helpDescription: "This page provides you with the support you needed. ",
        title: 'Help',
        name: 'andrew mead'
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'The address term should be given'
        })
    }

    geocode(req.query.address, (error,{latitude, longitude, place_name} = {}) => {
        if (error){
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, data) => {
            if (error){
                return res.send({
                    error: error
                })
            }

            res.send({
                forecast: data,
                location: place_name,
                address: req.query.address
            })
                
            })
        })
    })

app.get('/products',(request, response) => {
    
    if(!request.query.search){
        return response.send({
            error: ' You must provide search option '
        })
    }

    console.log(request.query.search)
    response.send({
        products: []
    })
})

app.get('/help/*',(request, response) => {
    response.render('error',{
        title: '404',
        name: "ANDREW",
        errorText: 'Help article not found'
    })
})

app.get('*',(request, response) => {
    response.render('error',{
        title: '404',
        name: 'ANDREW',
        errorText: 'Page not found'
    })
})

app.listen('3000',() => {
    console.log("the server is running in the port 3000")
})