<template>
    <div id="map"></div>
</template>

<script>
    export default {
        data() {
            return {
                accessToken: "pk.eyJ1Ijoic2hhdG5lciIsImEiOiJjamFkcWo1cGoxbng1MzdxbWJ1M2p1MDZzIn0.kXyKDLhGmdrsK4sHkY6Z5A"
            }
        },

        mounted() {
            this.buildMap();
        },

        methods: {
            buildMap() {
                mapboxgl.accessToken = this.accessToken;

                var map = new mapboxgl.Map({
                    container: 'map', // container id
                    style: 'mapbox://styles/mapbox/streets-v10', // stylesheet location
                    center: [-74.50, 40], // starting position [lng, lat]
                    zoom: 9 // starting zoom
                });
                map.resize();
            }
        }
    }
</script>

<style>
    body { margin:0; padding:0; }
    #map { position:absolute; top:0; bottom:0; width:100%; height: 100%; z-index: 1; }
</style>