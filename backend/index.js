import axios from 'axios';

const http = require('http');
const port = 3000;
const baseApiUrl = 'https://llb.cloud.tyk.io/llb-bus-api/';
const busDataUrl = 'GetData?busId=';
const authStr = 'Bearer 5a07a2f986f30e00015b3cb1b4768fc0e06940ee8c440c550a42fec7';

const requestHandler = (request, response) => {
    console.log(request.url);
    /*axios.get('http://llb.vtt.fi/LLBDataAPI/GetData?busId=1612').then(result => {
        console.log(result);
    });*/
    getBusDataLocation(1612).then(result => {
        console.log("resulted");
        console.log(result);
        let stringData = JSON.stringify(result);
        response.end(stringData);
    }).catch(error => {
        console.log(error);
    });
}

/*axios.get('http://llb.vtt.fi/LLBDataAPI/GetData?busId=1612', { 'headers': { 'Authorization': authStr } }).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});*/

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }

    console.log(`server is listening on ${port}`);
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