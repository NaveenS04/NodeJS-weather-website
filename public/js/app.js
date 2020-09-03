console.log("Welcome to the client side javascript file and the index page so that we confirm it is working.")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgone = document.querySelector('#msgone')
const msgtwo = document.querySelector('#msgtoo')

weatherForm.addEventListener('submit',(e) => {cd
    e.preventDefault()

    const location = search.value

    const url = 'http://localhost:3000/weather?address='+location

    msgone.textContent = 'loading...'
    msgtwo.textContent = ''

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                msgone.textContent = data.error
            } else{
                msgone.textContent = data.location
                msgtwo.textContent = data.forecast
            }
        })
    })
    
})