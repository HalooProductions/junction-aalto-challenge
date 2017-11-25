<template>
    <div class="map-container card-panel weatherComponent">
        <div>
            <h4 >Weather</h4>
            <p><i class="small material-icons">access_time</i> {{ hours }}:{{mins}} :<b> {{weatherNow}}°C</b> <i class="small material-icons">{{i1}}</i></p>
            <p><i class="small material-icons">access_time</i> {{ hours + 3}}:{{mins}}:<b> {{weather}}°C</b> <i class="small material-icons">{{i2}}</i></p>
            
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
        font-size: 26px;
        text-align: left;
        color:white;
        position: fixed;
        top: 1 px;
        left: 10px;
        z-index: 99;
        background-color: #007AC9 ;
        border-radius:15px
    }
/*
    .message { font-weight: 500;}
    
    .map-container { position: fixed; z-index: 99; width:20%; height: 15%; border-radius: 25px; background-color: #3875d8; font: white; text-align: left;}
    .font-color{color: white; font-family: "Roboto";  font-size: 40px; position: relative; text-align: center; line-height: 0.3%; text-align: left;}
    .tier { position: relative; z-index: 99;  }*/
</style>