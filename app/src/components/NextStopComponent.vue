<template>
  <div class="row">
    <div class="NextStopComponent col s3 push-s9">
      <h3>{{ msg }}</h3>
      <p><b>Next stop:</b></br>Rautatientori</br>2 min</p>
    </div>
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
    p, b {
        color: #FFFFFF;
    }
    .row {
      margin-right: 10px;
    }
</style>
