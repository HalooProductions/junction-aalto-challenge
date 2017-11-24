<template>
     <div class="NextStopComponent">
    <h3>{{ msg }}</h3>

      <p class="z-depth-4 card-panel blue"  ><b>Seuraava pysäkki:</b></br>Rautatientori</br>2 min</p>
  </div>
  
</template>

<script>
export default {
  name: 'NextStopComponent',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .NextStopComponent {
        text-align: center;
        color:white;
        position: fixed;
        top: 1 px;
        right: 10px;
        z-index: 99;
    }
    .z-depth-4 {
        border-radius:15px
    }
</style>
