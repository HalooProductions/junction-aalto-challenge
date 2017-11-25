import axios from 'axios';
import express from 'express';
import path from 'path';

const baseApiUrl = 'https://llb.cloud.tyk.io/llb-bus-api/';
const busDataUrl = 'GetData?busId=';
const authStr = 'Bearer 5a07a2f986f30e00015b3cb1b4768fc0e06940ee8c440c550a42fec7';
const weatherApiUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=Helsinki,FI&appid=453382cec788339c262b0ffbf0ec4ff0&units=metric';

let app = express();

app.get('/buslocation/:busid', (req, res) => {
    getBusDataLocation(req.params.busid).then(result => {
        console.log(result);
        let stringData = JSON.stringify(result);

        res.setHeader('Content-Type', 'application/json');
        res.send(stringData);
    }).catch(error => {
        console.log(error);
        res.send('error getting bus location');
    });
});

app.get('/weather', (req, res) => {
    getWeatherInfo().then(result => {
        let data = JSON.stringify(result);
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    })
    .catch(error => {
        console.log('rejected');
        res.send(error);
    });
});

app.use('/static', express.static('static'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('index.html'));
});

var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 });

const getBusDataLocation = busId => {
    console.log('getBusData');
    return new Promise((resolve, reject) => {
        if (typeof busId === 'undefined') {
            console.warn('BusID is required!');
            reject('no busid provided');
        }
    
        axios.get(baseApiUrl + busDataUrl + busId, { 'headers': { 'Authorization': authStr } }).then(response => {
            console.log("resolving");
            resolve({lat: response.data.lat, lon: response.data.lon});
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
}

const getWeatherInfo = () => {
    return new Promise((resolve, reject) => {
        axios.get(weatherApiUrl).then(response => {
            let list = response.data.list;
            resolve({
                currentWeather: {
                    temp: list[0].main.temp,
                    weatherType: list[0].weather[0].main
                },
                nextWeather: {
                    temp: list[1].main.temp,
                    weatherType: list[1].weather[0].main
                }
            });
        })
        .catch(error => {
            console.log('rejecting');
            reject(error);
        });
    });
}