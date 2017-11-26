<template>
  <div class="row">
    <div class="SpeedComponent">
      <p>Current speed</p>
      <p>{{ speed }} km/h</p>
    </div>
  </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                speed: "",
            }
        },
        mounted() {
            this.getData().then(() => {
                console.log(this.speed);
            });
            setInterval(() => {
                this.getData();
            }, 1000);
        },
        methods: {
            getData() {
                return new Promise((resolve, reject) => {
                    let round;
                    axios.get('/facts').then(response => {
                       console.log(resData);
                        let resData = response.data;
                        round = parseFloat(resData.speed);
                        this.speed = Math.round(round);
                        resolve();
                    })
                    .catch(error => {
                        console.log(error);
                        reject();
                    });
                })
                
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .SpeedComponent {
        font-size: 22px;
        text-align: left;
        position: fixed;
        right: 375px;
        bottom: 235px;
        z-index: 99;
        border-radius: 15px;
        background-color: #007AC9;
        font-size: 24px;
        padding: 15px;
        width: 13%;
        height: 30%;
    }
    p, b {
        color: #FFFFFF;
        font-family: "Roboto";
    }
    .row {
      margin-right: 10px;
    }
</style>