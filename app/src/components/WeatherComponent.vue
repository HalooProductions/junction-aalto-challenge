<template>
    <div class="map-container card-panel white">
        <div class="tier">
            <p>{{ hours }}:{{mins}}</p>
            <p>{{ hours+3 }}:{{mins}}</p>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            
            return {
                message: "",
                hours:"",
                mins: ""
            }
        },

        mounted() {
            this.test();
            this.getTime();
            setInterval(() => {
                this.convertTime(this.tHours);
                this.convertTime(this.tMins);
            },1000);
        },

        methods: {
            getTime(){
                var time = new Date();
                let tHours = time.getHours();
                let tMin = time.getMinutes();
                this.hours = this.convertTime(tHours);
                this.mins = this.convertTime(tMin);
                
                console.log(this.hours);
            },
            convertTime(time) {
                if (time < 10) {
                    return "0" + time;
                } else {
                    return time;   
                }
            },
            test() {
                this.message = "+3";
            }
        }
    }
</script>

<style>
    .message { font-weight: 500;}
    
    .map-container { position: fixed; z-index: 99; width:20%; height: 15%; border-radius: 25px; border: 15px solid #3875d8; }
    .tier { position: fixed; z-index: 99; text-align: center; }
</style>