const request = require('request')

const forecast = (lat,long,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2d8c263ba3a2d335941b1da4d856d16f&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '&units=f'

    request({  url, json : true }, (error, {body}) => {
        if(error){
            callback("Unable to reach the api", undefined)
        } else if(body.error){
            callback("unable to find the location!", undefined)
        } else{
            callback(undefined,body.current.weather_descriptions + '. It is currently '+ body.current.temperature+' degrees out. It feels like '+body.current.feelslike+ ' degrees out')
        }
    })
}

module.exports=forecast