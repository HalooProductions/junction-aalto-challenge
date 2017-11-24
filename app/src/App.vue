<template>
  <div id="MapComponent">
    <MapComponent/>
    <EnvironmentStaticsComponent/>
  </div>
</template>

<script>
import MapComponent from './components/MapComponent'
import EnvironmentStaticsComponent from './components/EnvironmentStaticsComponent'
export default {
  name: 'app',
  components: {
    MapComponent, EnvironmentStaticsComponent
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
