<template>
    <div id="map"></div>
</template>

<script>
    export default {
        data() {
            return {
                accessToken: "pk.eyJ1Ijoic2hhdG5lciIsImEiOiJjamFkcWo1cGoxbng1MzdxbWJ1M2p1MDZzIn0.kXyKDLhGmdrsK4sHkY6Z5A",
                map: null
            }
        },

        mounted() {
            this.buildMap();
            setTimeout(() => {
                this.jumpToLocation([24.855831, 60.192059])
            }, 5000);
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

                this.buildMarkers(data.testData)
            },

            buildMarkers(testData) {

                // add markers to map
                testData.features.forEach((marker) => {

                    // create a HTML element for each feature
                    var el = document.createElement('div');
                    el.className = 'marker';

                    // make a marker for each feature and add to the map
                    new mapboxgl.Marker(el)
                    .setLngLat(marker.geometry.coordinates)
                    .addTo(this.map);
                });
            },

            jumpToLocation(location) {
                this.map.flyTo({center: location})
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