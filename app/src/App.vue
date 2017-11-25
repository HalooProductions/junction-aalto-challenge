<template>
  <div id="MapComponent">
    <MapComponent/>
    <WeatherComponent/>
    <div id="infoBox">
      <SpeedComponent/>
      <EnvironmentStaticsComponent/>
    </div>
  </div>
</template>

<script>
import MapComponent from './components/MapComponent'
import EnvironmentStaticsComponent from './components/EnvironmentStaticsComponent'
import SpeedComponent from './components/SpeedComponent'
import WeatherComponent from './components/WeatherComponent'
export default {
  name: 'app',
  components: {
    MapComponent, EnvironmentStaticsComponent, SpeedComponent, WeatherComponent
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
