import axios from 'axios';
import express from 'express';
import path from 'path';

const baseApiUrl = 'https://llb.cloud.tyk.io/llb-bus-api/';
const busDataUrl = 'GetData?busId=';
const authStr = 'Bearer 5a07a2f986f30e00015b3cb1b4768fc0e06940ee8c440c550a42fec7';

const stopUrl = "http://api.digitransit.fi/routing/v1/routers/hsl/index/graphql";

let app = express();

app.get('/buslocation/:busid', (req, res) => {
    getBusDataLocation(req.params.busid).then(result => {
        console.log(result);
        let stringData = JSON.stringify(result);
        res.send(stringData);
    }).catch(error => {
        console.log(error);
        res.send('error getting bus location');
    });
});

app.use('/static', express.static('static'));

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



    //console.log(result);
    //res.send(response.data);
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

