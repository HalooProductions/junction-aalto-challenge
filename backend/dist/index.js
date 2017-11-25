'use strict';

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseApiUrl = 'https://llb.cloud.tyk.io/llb-bus-api/';
var busDataUrl = 'GetData?busId=';
var authStr = 'Bearer 5a07a2f986f30e00015b3cb1b4768fc0e06940ee8c440c550a42fec7';

var stopUrl = "http://api.digitransit.fi/routing/v1/routers/hsl/index/graphql";

var app = (0, _express2.default)();

app.get('/buslocation/:busid', function (req, res) {
    getBusDataLocation(req.params.busid).then(function (result) {
        console.log(result);
        var stringData = JSON.stringify(result);
        res.send(stringData);
    }).catch(function (error) {
        console.log(error);
        res.send('error getting bus location');
    });
});

app.use('/static', _express2.default.static('static'));

app.get('/', function (req, res) {
    res.sendFile(_path2.default.resolve('index.html'));
});

app.get('/nextstop/:name', function (req, res) {

    var configGraphQL = {
        url: 'http://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
        method: 'post',
        headers: { 'Content-Type': 'application/graphql' },
        data: '{\n            pattern(id:"HSL:1023:1:01") {\n              name\n              stops{\n                name  \n              }\n            }\n          }'
    };

    (0, _axios2.default)(configGraphQL).then(function (response) {
        console.log('graphql response:', response.data);
        var stopData = JSON.stringify(response.data);
        res.send(stopData);
    }).catch(function (err) {
        console.log('graphql error:', err);
    });

    //console.log(result);
    //res.send(response.data);
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});

var getBusDataLocation = function getBusDataLocation(busId) {
    console.log('getBusData');
    return new Promise(function (resolve, reject) {
        if (typeof busId === 'undefined') {
            console.warn('BusID is required!');
            reject('no busid provided');
        }

        _axios2.default.get(baseApiUrl + busDataUrl + busId, { 'headers': { 'Authorization': authStr } }).then(function (response) {
            console.log("resolving");
            resolve({ lat: response.data.lat, lon: response.data.lon });
        }).catch(function (error) {
            console.log(error);
            reject(error);
        });
    });
};