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
                coordinatesFromStart: { data: [] }
            }
        },

        mounted() {
            let coords = [
                        [-122.48369693756104, 37.83381888486939],
                        [-122.48348236083984, 37.83317489144141],
                        [-122.48339653015138, 37.83270036637107],
                        [-122.48356819152832, 37.832056363179625],
                        [-122.48404026031496, 37.83114119107971],
                        [-122.48404026031496, 37.83049717427869],
                        [-122.48348236083984, 37.829920943955045],
                        [-122.48356819152832, 37.82954808664175],
                        [-122.48507022857666, 37.82944639795659],
                        [-122.48610019683838, 37.82880236636284],
                        [-122.48695850372314, 37.82931081282506],
                        [-122.48700141906738, 37.83080223556934],
                        [-122.48751640319824, 37.83168351665737],
                        [-122.48803138732912, 37.832158048267786],
                        [-122.48888969421387, 37.83297152392784],
                        [-122.48987674713133, 37.83263257682617],
                        [-122.49043464660643, 37.832937629287755],
                        [-122.49125003814696, 37.832429207817725],
                        [-122.49163627624512, 37.832564787218985],
                        [-122.49223709106445, 37.83337825839438],
                        [-122.49378204345702, 37.83368330777276]
            ];

            coords.forEach((coordinates) => {
                this.coordinatesFromStart.data.push(coordinates);
            });

            this.buildMap();

            
            /*let loop = (async () => {
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

            setTimeout(() => {
                this.jumpToLocation([24.855831, 60.192059]);
            }, 5000);*/
        },

        methods: {
            buildMap() {
                let data = {
                    coordinates: [-122.486052, 37.830348]/*[24.945831, 60.192059]*/,
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

                setTimeout(() => {
                    this.coordinatesFromStart.data.push([-122.49378204345702 -0.00154495239257, 37.83368330777276]);
                }, 000);
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