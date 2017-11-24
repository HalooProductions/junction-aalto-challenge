<template>
  <div class="EnvironmentStatics">
      <p>LOLOLOLOLOLOLOL</p>
      <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: 'EnviromentStaticsComponent',
  data () {
    return {
      msg: RandomFact()
    }
  }
}

function RandomFact()
{
    var facts = [
        "25 minuuttia kuluttaa Helsingin seudun asiakas päivittäin joukkoliikenteessä. kaiken kaikkiaan hän käyttää matkustamiseen tunnin ja 13 minuuttia päivässä.",
        "92 250 ihmistä matkustaa Helsingin keskustaan arkiaamuna klo 6-9. Heistä 73,6 % kulkee joukkoliikenteellä.",
        "Runkolinja 550 on suosituin bussilinja. Sitä käyttää 16 000 matkustajaa päivässä."
    ]

    return facts[Math.floor((Math.random() * 3) + 0)];
}
</script>


<style scoped>
    .EnvironmentStatics {
        position: fixed;
        top: 10px;
        left: 10px;
        z-index: 99; 
        border: 2px solid;
        border-radius: 15px; 
        background-color: #007AC9;     
    }
    .card-panel {
        background-color: #007AC9;
    }
</style>
