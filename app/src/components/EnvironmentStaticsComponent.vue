<template>
  <div class="EnvironmentStatics z-depth-4">
      <p>Moottorin hyötysuhde tällä hetkellä:</p>
      <p>{{ msg }}</p>
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
        font-size: 26px;
        text-align: left;
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 99;
        border-radius: 15px;
        background-color: #007AC9;
        font-size: 24px;
        padding: 15px;
    }


    p {
        color: #FFFFFF;
    }
</style>
