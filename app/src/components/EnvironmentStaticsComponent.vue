<template>
<div class="row">
  <div class="EnvironmentStatics">
      <p>Environmental facts:</p>
      <p>Current engine efficiency: {{ msg }}</p>
  </div>
</div>
</template>

<script>
export default {
  name: 'EnviromentStaticsComponent',
  data () {
    return {
      msg: "21%"
    }
  }
}
</script>


<style scoped>
    .EnvironmentStatics {
        font-size: 22px;
        text-align: left;
        position: fixed;
        bottom: 10px;
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
</style>
