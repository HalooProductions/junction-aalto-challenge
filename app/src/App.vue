<template>
  <div id="MapComponent">
    <MapComponent/>
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
export default {
  name: 'app',
  components: {
    MapComponent, EnvironmentStaticsComponent, NextStopComponent, OtherBusComponent
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
  width: 100%;
  height: 100%;
}
</style>
