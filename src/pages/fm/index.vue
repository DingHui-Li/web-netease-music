<template>
    <div id='fm'>
        <div class="bg">
            <img class="img" src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597929590398&di=beb4afb61f18c941c3260aae7f399edc&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F42955e73e53a1e7a745b266301bdb629eb91a4ab1eda7-nv7pfT_fw658'></img>
        </div>
        <div class="row justify-center" >
            <div class="col-xs-12 col-lg-8 col-xl-6 box">
                <div class="container">
                    <div class="left">
                        <q-btn class="btn" round icon='fas fa-heart'></q-btn>
                    </div>
                    <div class="mid">
                        <div class="name">Never Be Like You (Funk LeBlanc Remix)</div>
                        <vue-aspect-ratio width='100%' ar='1:1'>
                            <div class="cover" @click="play=!play" v-ripple>
                                <q-img class="img" src='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3032737645,615936838&fm=26&gp=0.jpg'></q-img>
                                <q-btn class="btn" round :icon="`fas fa-${play?'pause':'play'}`" :style="`top:${!play?'50%':'100%'};left:${!play?'50%':'100%'}`"></q-btn>
                            </div>
                        </vue-aspect-ratio>
                        <div class="singers">Funk LeBlanc</div>
                        <div class="album">Never Be Like You</div>
                    </div>
                    <div class="right">
                        <q-btn class="btn" round icon='fas fa-step-forward'></q-btn>
                    </div>
                </div>
                <div class="chart">
                    <div class="current">0:00</div>
                    <div id="waveform"></div>
                    <div class="duration">4:32</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueAspectRatio from 'vue-aspect-ratio'
import WaveSurfer from 'wavesurfer.js'
import WaveSurferCursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';
export default {
    components:{VueAspectRatio},
    data(){
        return{
            url:"http://m8.music.126.net/20200821131632/25bc5dec4a32dc554886a1a37cdc6ced/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/3439200750/bd5b/e85a/8cc5/645d04e1bc42c08d467dbe590de92bc3.mp3",
            play:false,
            wavesurfer:null
        }
    },
    computed:{
        duration(){
            let time=this.data.dt
            let sec=parseInt(time%(1000*60)/1000)
            sec=sec<10?('0'+sec):sec
            return parseInt(time/(1000*60))+":"+sec
        }
    },
    mounted(){
        this.waveInit()
    },
    watch:{
        play(v){
            if(!this.wavesurfer) return
            if(v){
                this.wavesurfer.play()
            }else{
                console.log('pause')
                this.wavesurfer.pause()
            }
        }
    },
    methods:{
        waveInit(){
            let wavesurfer=WaveSurfer.create({
                container:'#waveform',
                barWidth: 2,
                barHeight: 1, 
                cursorColor:'transparent',
                progressColor:'#fff',
                waveColor:'grey',
                plugins: [
                    WaveSurferCursor.create({
                        showTime: true,
                        opacity: 1,
                        color:'#fff',
                        width:'2px',
                        customShowTimeStyle: {
                            'background-color': '#fff',
                            'border-radius':'10px',
                            color: '#000',
                            padding: '2px 7px',
                            'font-size': '10px'
                        }
                    })
                ]
            })
            wavesurfer.load(this.url)
            this.wavesurfer=wavesurfer
        }
    }
}
</script>

<style lang='scss' scoped>
    #fm{
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 100%;
        background: #fff;
        transition-duration: .5s;
        overflow: hidden;
        .bg{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background: linear-gradient(to top,rgba(#000,0.6),rgba(#000,0.1));
            .img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                filter: blur(40px);
                transform: scale(1.2);
                position: absolute;
                z-index: -1;
            }
        }
        .box{
            height: 100vh;
            display: flex;
            flex-direction: column;
            padding-bottom: 100px;
            .container{
                flex: 1;
                width: 100%;
                display: flex;
                cursor: pointer;
                .btn{
                    color: $primary;
                    background: #fff;
                }
                .left{
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .right{
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .mid{
                    flex: 2;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    .name{
                        font-size: 2rem;
                        font-weight: bold;
                        margin-bottom: 20px;
                        color: #fff;
                    }
                    .singers{
                        color: rgba($color: #448AFF, $alpha: 1);
                        text-align: center;
                        margin-top: 20px;
                        font-weight: bold;
                    }
                    .album{
                        font-size: 1rem;
                        font-weight: bold;
                        text-align: center;
                        color: rgba($color: #fff, $alpha: 0.8);
                    }
                    .cover{
                        position: relative;
                        background: pink;
                        width: 100%;
                        height: 100%;
                        margin: auto;
                        box-shadow: 0 10px 50px 1px rgba($color: #000000, $alpha: 0.1);
                        .img{
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                        .btn{
                            position: absolute;
                            // top:50%;
                            // left: 50%;
                            transform: translate(-50%,-50%);
                            width: 100px;
                            height: 100px;
                            transition: all .5s;
                            transition-timing-function:ease-in-out;
                        }
                    }
                }
            }
            .chart{
                position: relative;
                z-index: 9;
                display: flex;
                align-items: center;
                #waveform{
                    flex: 1;
                    position: relative;
                }
                .current{
                    padding-right: 5px;
                    color: rgba($color: #fff, $alpha: 0.8);
                }
                .duration{
                    color: rgba($color: #fff, $alpha: 0.8);
                }
            }
        }
    }
</style>