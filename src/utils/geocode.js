const request = require('request')

const geocode = (location, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(location)+'.json?access_token=pk.eyJ1IjoibmF2ZWVuc2VrYXI3NTkiLCJhIjoiY2tlYzdjN3FzMGZ5bzJxbWt0ODU0eDF2ZiJ9.2gtKD5Z7nsBVjCB8y33j1A&limit=1'
    request({ url, json:true}, (error, {body})=>{
        if(error){
            callback("Unable to connect to location services!", undefined)
        } else if(body.features.length === 0){
            callback("Unable to find the location. try another search!", undefined)
        } else{
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                place_name : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode