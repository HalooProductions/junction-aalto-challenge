import axios from 'axios';
import express from 'express';
import path from 'path';

const baseApiUrl = 'https://llb.cloud.tyk.io/llb-bus-api/';
const busDataUrl = 'GetData?busId=';
const authStr = 'Bearer 5a07a2f986f30e00015b3cb1b4768fc0e06940ee8c440c550a42fec7';
const weatherApiUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=Helsinki,FI&appid=453382cec788339c262b0ffbf0ec4ff0&units=metric';

const stopUrl = "http://api.digitransit.fi/routing/v1/routers/hsl/index/graphql";

let app = express();

let testCoordinates = {
    lat: 60.214959827,
    lon: 24.96679415
};

let busRoutes = [
    { bus: 1612, route: 23 },
    { bus: 3008, route: 55 },
    { bus: 3009, route: 55 }
];

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

app.use('/static', express.static('static'));
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
            pattern(id:"HSL:1055:1:01") {
              name
              stops{
                name
                lat
                lon 
              }
            }
          }`
    };

    axios(configGraphQL).then(response => {
        console.log('graphql response:', response.data); 
        let stopData = JSON.stringify(response.data);
        res.setHeader('Content-Type', 'application/json');
        res.send(stopData);
    }).catch(err => {
        console.log('graphql error:', err);
    });
});

app.get('/motorefficiency/:busid', (req, res) => {
    getMotorEfficiency(req.params.busid).then(result => {
        res.send(result);
    });
});

app.get('/routeinformation/:busid', (req, res) => {
    let route = null;
    for (let i = 0; i < busRoutes.length; i++) {
        if (busRoutes[i].bus === parseInt(req.params.busid)) {
            route = busRoutes[i];   
        }
    }
    
    if (!route) {
        res.send('route not found');
    } else {
        getRouteInformation(route).then(result => {
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        });
    }
});

const getMotorEfficiency = bus => {
    return new Promise((resolve, reject) => {
        axios.get(baseApiUrl + busDataUrl + bus, { 'headers':  { 'Authorization': authStr } }).then(result => {
            resolve(result.data[`fi/llb/bus/${bus}/can/`].EFFICIENCY_Efficiency);
        })
        .catch(err => {
            reject(err);
        });
    });
};

const getRouteInformation = (route) => {
    return new Promise((resolve, reject) => {
        let configGraphQL = {
            url: 'http://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
            method: 'post', 
            headers: { 'Content-Type': 'application/graphql' },
            data: `{
                routes(name: "${route.route}", modes: "BUS") {
                  stops {
                    lat,
                    lon,
                    name
                  }
                  shortName
                  longName
                  desc
                }
              }`
        };
    
        axios(configGraphQL).then(response => {
            console.log('graphql response:', response.data); 
            let stopData = JSON.stringify(response.data.data.routes[0]);
            resolve(stopData);
        }).catch(err => {
            console.log('graphql error:', err);
            reject(err);
        });
    });
};

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

const getTestLocation = () => {
    let randomNum = Math.floor(Math.random() * 0.2) + 0.01;
    testCoordinates.lat += randomNum;
    testCoordinates.lon += randomNum;

    return testCoordinates;
}

