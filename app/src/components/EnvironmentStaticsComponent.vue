<template>
<div class="row">
  <div class="EnvironmentStatics">
      <p>Did you know?</p>
      <p>{{fact}}</p>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'EnviromentStaticsComponent',
  data () {
    return {
      msg: "21%",
      facts: [
        'Otters sleep holding hands',
        'A crocodile can\'t stick it\'s tongue out.',
        'It is physically impossible for pigs to look up into the sky.',
        'If you sneeze too hard, you can fracture a rib.',
        'A duck\'s quack doesn\'t echo, and no one knows why.',
        'Like fingerprints, everyone\'s tongue print is different.',
        'Rats and horses can\'t vomit.',
        'Every human spent about half an hour as a single cell.',
        'Hot water is heavier than cold.',
        'Sound travels 15 times faster through steel than through the air.',
        'Ketchup was sold in the 1830s as medicine.',
        'Current engine efficiency:'

      ],
      fact:"Otters sleep holding hands"
    }
  },
  mounted() {
    setInterval(() => {
                this.getFact();
                this.getEff();
            }, 20000);
  },
  methods: {
    getFact() {
      this.fact = this.facts[Math.floor(Math.random() * this.facts.length)];
    },
    getEff() {
      return new Promise((resolve, reject) => {
                    let round;
                    axios.get('/motorefficiency/3009').then(response => {
                        this.facts[11] = 'Current engine efficiency:' + response;
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
