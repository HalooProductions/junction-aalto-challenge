<template>
<div class="row">
  <div class="EnvironmentStatics">
      <p>Environmental facts:</p>
  </div>
</div>
</template>

<!--<script>
export default {
  name: 'EnviromentStaticsComponent',
  data () {
    return {
      msg: "21%"
    }
  }
}
</script>-->
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


<style scoped>
    .EnvironmentStatics {
        font-size: 22px;
        text-align: left;
        position: fixed;
        bottom: 10px;
        right: 10px;
        z-index: 99;
        border-radius: 15px;
        background-color: #64BE1E;
        font-size: 24px;
        padding: 15px;
        width: 34.5%;
        height: 25%;
        
    }
    p, b {
        color: #FFFFFF;
        font-family: Century Gothic;
    }
</style>
