<template>
    <div class="weatherComponent">
        <div>
            <p>Weather</p>
            <p><i class="small material-icons">access_time</i> {{ hours }}:{{mins}} : {{weatherNow}}°C <i class="small material-icons">{{i1}}</i></p>
            <p><i class="small material-icons">access_time</i> {{ parseInt(hours) + 3 }}:{{mins}}: {{weather}}°C <i class="small material-icons">{{i2}}</i></p>
            
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            
            return {
                message: "",
                hours:"",
                mins: "",
                iconNow:"",
                icon:"",
                weatherNow:"",
                weather:"",
                i1:"",
                i2:""
            }
        },

        mounted() {
            this.test();
            this.getTime();
            this.getData().then(() => {
                this.i1=this.setIcon(this.iconNow);
                this.i2=this.setIcon(this.icon);
                console.log(this.i2);
            });
            setInterval(() => {
                this.getTime();
            }, 1000);
        },

        methods: {
            getTime(){
                var time = new Date();
                let tHours = time.getHours();
                let tMin = time.getMinutes();
                this.hours = this.convertTime(tHours);
                this.mins = this.convertTime(tMin);
            },
            convertTime(time) {
                if (time < 10) {
                    return "0" + time;
                } else {
                    return time;   
                }
            },
            setIcon(main) {
                let tIcon;
                switch(main){
                    case "Clouds":
                       tIcon = 'wb_cloudy';
                        break;
                    case "Rain":
                        tIcon = 'wb_cloudy';
                        break;
                    case "Clear":
                        tIcon = 'wb_sunny';
                        break;
                    case "Snow":
                        tIcon = 'wb_cloudy';
                        break;
                }
                return tIcon;
            },
            test() {
                this.message = "+3";
            },
            getData() {
                return new Promise((resolve, reject) => {
                    let round;
                    axios.get('/weather').then(response => {
                        let resData = response.data;
                        round = parseFloat(resData.currentWeather.temp);
                        this.weatherNow = Math.round(round);
                        round = parseFloat(resData.nextWeather.temp);
                        this.weather = Math.round(round);
                        this.iconNow = resData.currentWeather.weatherType;
                        this.icon = resData.nextWeather.weatherType;
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

<style>
    .weatherComponent {
        font-size: 22px;
        text-align: left;
        position: fixed;
        bottom: 235px;
        right: 10px;
        z-index: 99;
        border-radius: 15px;
        background-color: #00B9E4;
        font-size: 24px;
        padding: 15px;
        width: 17%;
        height: 30%;
        
    }
    p, b {
        color: #FFFFFF;
        font-family: "Roboto";
    }
</style>