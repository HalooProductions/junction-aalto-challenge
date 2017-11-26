<template>
    <div id="map"></div>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                accessToken: "pk.eyJ1Ijoic2hhdG5lciIsImEiOiJjamFkcWo1cGoxbng1MzdxbWJ1M2p1MDZzIn0.kXyKDLhGmdrsK4sHkY6Z5A",
                map: null,
                marker: null,
                coords: []
            }
        },

        mounted() {

            axios.get('/routeinformation/3009')
                .then((response) => {
                    let stops = response.data.stops;

                    for(let i = 0; i < stops.length; i++) {
                        this.coords.push([stops[i].lon, stops[i].lat]);
                    }
                })
                .catch((error) => {
                    console.log(error);
                }); 

            this.buildMap();

            
            let loop = (async () => {
                while (true) {
                    await new Promise(resolve => {
                        axios.get('/buslocation/3009')
                        .then((response) => {
                            this.coordinatesFromStart.push([response.data.lon, response.data.lat]);
                            this.jumpToLocation([response.data.lon, response.data.lat]);
                        })
                        .catch((response) => {
                            console.log(response);
                        });

                        setTimeout(resolve, 1000);
                    });
                }
            })();
        },

        methods: {
            buildMap() {
                let data = {
                    coordinates: [24.945831, 60.192059],
                    testData: {
                        type: 'FeatureCollection',
                        features: [{
                            type: 'Feature',
                            geometry: {
                            type: 'Point',
                            coordinates: [24.945831, 60.192059]
                            },
                            properties: {
                            title: 'Mapbox',
                            description: 'Washington, D.C.'
                            }
                        },
                        {
                            type: 'Feature',
                            geometry: {
                            type: 'Point',
                            coordinates: [24.945, 60.192060]
                            },
                            properties: {
                            title: 'Mapbox',
                            description: 'San Francisco, California'
                            }
                        }]
                    }
                };

                mapboxgl.accessToken = this.accessToken;

                this.map = new mapboxgl.Map({
                    container: 'map', // container id
                    style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
                    center: data.coordinates, // starting position [lng, lat]
                    zoom: 14 // starting zoom
                });
                console.log(this.coordinatesFromStart.data);
                this.map.on('load', () => {
                    this.map.addLayer({
                        "id": "route",
                        "type": "line",
                        "source": {
                            "type": "geojson",
                            "data": {
                                "type": "Feature",
                                "properties": {},
                                "geometry": {
                                    "type": "LineString",
                                    "coordinates":  this.coordinatesFromStart.data 
                                }
                            }
                        },
                        "layout": {
                        "line-join": "round",
                        "line-cap": "round"
                        },
                        "paint": {
                            "line-color": "blue",
                            "line-width": 8
                        }
                    })
                });
                this.buildMarkers(data.testData);
            },

            buildMarkers(testData) {

                // add markers to map
                testData.features.forEach((marker) => {

                    // create a HTML element for each feature
                    var el = document.createElement('div');
                    el.className = 'marker';

                    // make a marker for each feature and add to the map
                    this.marker = new mapboxgl.Marker(el)
                    .setLngLat(marker.geometry.coordinates)
                    .addTo(this.map);
                });
            },

            jumpToLocation(location)  {
                this.map.flyTo({center: location});
                this.marker.setLngLat(location);
            }
        }
    }
</script>

<style>
    body { margin:0; padding:0; }
    #map { position:absolute; top:0; bottom:0; width:100%; height: 100%; }
    .marker {
        background-image: url('../assets/mapbox-icon.png');
        background-size: cover;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
    }
</style>