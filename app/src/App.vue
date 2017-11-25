<template>
  <div id="MapComponent">
    <MapComponent/>
    <WeatherComponent/>
    <div id="infoBox">
      <NextStopComponent/>
      <OtherBusComponent/>
      <EnvironmentStaticsComponent/>
    </div>
  </div>
</template>

<script>
import MapComponent from './components/MapComponent'
import NextStopComponent from './components/NextStopComponent'
import EnvironmentStaticsComponent from './components/EnvironmentStaticsComponent'
import OtherBusComponent from './components/OtherBusComponent'
import WeatherComponent from './components/WeatherComponent'
export default {
  name: 'app',
  components: {
    MapComponent, EnvironmentStaticsComponent, NextStopComponent, OtherBusComponent, WeatherComponent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100%;
  width: 100%;
}
</style>
