import axios from 'axios';
import express from 'express';
import path from 'path';

const baseApiUrl = 'https://llb.cloud.tyk.io/llb-bus-api/';
const busDataUrl = 'GetData?busId=';
const testBusDataUrl = 'GetData?busId=3009';
const authStr = 'Bearer 5a07a2f986f30e00015b3cb1b4768fc0e06940ee8c440c550a42fec7';
const weatherApiUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=Helsinki,FI&appid=453382cec788339c262b0ffbf0ec4ff0&units=metric';

const stopUrl = "http://api.digitransit.fi/routing/v1/routers/hsl/index/graphql";

let app = express();

let testCoordinates = {
    lat: 60.214959827,
    lon: 24.96679415
};

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

app.get('/testdata', (req, res) => {
    let data = getTestLocation();

    res.setHeader('Content-Type', 'application/json');
    res.send(data);
});

/*FAKTABOXI*/
app.get('/facts', (req, res) => {
    getFacts().then(result => {
        let data = JSON.stringify(result);
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    })
    .catch(error => {
        console.log('rejected');
        res.send(error);
    });
});

app.use('/static', express.static('static'))
app.use('/materialize', express.static('materialize'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('index.html'));
});

app.get('/nextstop/:name', (req, res) => {

    let configGraphQL = {
        url: 'http://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
        method: 'post', 
        headers: { 'Content-Type': 'application/graphql' },
        data: `{
            pattern(id:"HSL:1023:1:01") {
              name
              stops{
                name  
              }
            }
          }`
    };

    axios(configGraphQL).then(response => {
        console.log('graphql response:', response.data); 
        let stopData = JSON.stringify(response.data);
        res.send(stopData);
    }).catch(err => {
        console.log('graphql error:', err);
    });
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
    
        axios.get(baseApiUrl + busDataUrl + busId, { 'headers':  { 'Authorization': authStr } }).then(response => {
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

const getFacts = () => {
    return new Promise((resolve, reject) => {
        axios.get(baseApiUrl + testBusDataUrl, { 'headers':  { 'Authorization': authStr } }).then(response => {
            // console.log("resolving");
            resolve({efficiency: response.data.EFFICIENCY_Efficiency, speed: response.data.spd});
        })
        .catch(error => {
            console.log('rejecting');
            reject(error);
        });
    });
}

const getTestLocation = () => {
    let randomNum = Math.floor(Math.random() * 0.2) + 0.01;
    testCoordinates.lat += randomNum;
    testCoordinates.lon += randomNum;

    return testCoordinates;
}

