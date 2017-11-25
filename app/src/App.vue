<template>
  <div id="MapComponent">
    <MapComponent/>
<<<<<<< HEAD
    <EnvironmentStaticsComponent/>
=======
    <NextStopComponent/>
>>>>>>> origin/NextStop
  </div>
</template>

<script>
import MapComponent from './components/MapComponent'
<<<<<<< HEAD
import EnvironmentStaticsComponent from './components/EnvironmentStaticsComponent'
export default {
  name: 'app',
  components: {
    MapComponent, EnvironmentStaticsComponent
=======
import NextStopComponent from './components/NextStopComponent'
export default {
  name: 'app',
  components: {
    MapComponent, NextStopComponent
>>>>>>> origin/NextStop
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
