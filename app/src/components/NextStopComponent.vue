<template>
    <div class="NextStopComponent">
      <p>Next stop:<hr></p>
      <p>{{ msg }}</p>
    </div>
</template>

<script>
export default {
  name: 'NextStopComponent',
  data () {
    return {
      msg: 'Rautatientori, 2min'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .NextStopComponent {
        font-size: 22px;
        text-align: left;
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 99;
        border-radius: 15px;
        background-color: #007AC9;
        font-size: 24px;
        padding: 15px;
        width: 34%;   
    }
    p, b {
        color: #FFFFFF;
        font-family: Century Gothic;
    }
    .row {
      margin-right: 10px;
    }
    hr {
      border: 2px solid;
      color: #FFFFFF;
      border-radius: 15px;
    }
</style>
