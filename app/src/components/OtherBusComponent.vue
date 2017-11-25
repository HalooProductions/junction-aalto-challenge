<template>
  <div class="row">
    <div class="OtherBusComponent">
      <p>Vaihtobussendaalenit</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OtherBusComponent',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .OtherBusComponent {
        font-size: 22px;
        text-align: left;
        position: fixed;
        right: 10px;
        top: 220px;
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