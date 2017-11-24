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
            this.initMap();
        },

        methods: {
            initMap() {
                var uluru = {lat: -25.363, lng: 131.044};
                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 4,
                    center: uluru
                });
                var marker = new google.maps.Marker({
                    position: uluru,
                    map: map
                });
            }
        }
    }
</script>

<style>
    body { margin:0; padding:0; }
    #map {  height: 100%;
        width: 100%; }
</style>