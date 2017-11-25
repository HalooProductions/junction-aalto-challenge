<template>
  <div class="row">
    <div class="OtherBusComponent col s3 push-s9">
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
        font-size: 26px;
        text-align: left;
        position: fixed;
        right: 10px;
        top: 5px;
        z-index: 99;
        border-radius: 15px;
        background-color: #007AC9;
        font-size: 24px;
        padding: 15px;
    }
    p, b {
        color: #FFFFFF;
    }
    .row {
      margin-right: 10px;
    }
</style>