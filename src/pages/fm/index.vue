<template>
    <div id='fm' v-if='list.length>0'>
        <div class="bg">
            <img class="img" :src='list[current].album.blurPicUrl+"?param=500y500"'></img>
        </div>
        <div class="row justify-center" >
            <div class="col-xs-12 col-lg-8 col-xl-6 box">
                <div class="container">
                    <div class="left">
                        <q-btn class="btn" round icon='fas fa-heart' size="lg"></q-btn>
                    </div>
                    <div class="mid">
                        <div class="name">{{list[current].name}}</div>
                        <vue-aspect-ratio width='100%' ar='1:1'>
                            <div class="cover" @click="play=!play" v-ripple>
                                <q-img class="img" :src='list[current].album.blurPicUrl+"?param=500y500"'></q-img>
                                <transition enter-active-class="animate__animated animate__zoomIn"
                                            leave-active-class="animate__animated animate__zoomOut">
                                    <q-btn class="btn" round :icon="`fas fa-${play?'pause':'play'}`"  v-show="!buffering"
                                    :style="`top:${!play?'50%':'100%'};left:${!play?'50%':'100%'}`"></q-btn>
                                </transition>
                            </div>
                        </vue-aspect-ratio>
                        <div class="singers">
                            <span v-for="singer in list[current].artists" :key="singer.id">{{singer.name}}</span>
                        </div>
                        <div class="album">{{list[current].album.name}}</div>
                    </div>
                    <div class="right">
                        <q-btn class="btn" round icon='fas fa-step-forward' size="lg" @click="next"></q-btn>
                    </div>
                </div>
                <div class="chart">
                    <div class="current">0:00</div>
                    <div class="chart-box">
                        <Loading class="loading" v-if='buffering'/>
                        <div id="waveform"></div>
                    </div>
                    <div class="duration">{{duration}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueAspectRatio from 'vue-aspect-ratio'
import WaveSurfer from 'wavesurfer.js'
import WaveSurferCursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';
import Loading from './loading'
export default {
    components:{VueAspectRatio,Loading},
    data(){
        return{
            play:false,//是否播放
            wavesurfer:null,
            list:[],//歌曲列表
            current:0,//当前播放下表
            url:"",//当前歌曲地址
            buffering:false
        }
    },
    computed:{
        duration(){
            let time=this.list[this.current].duration
            let sec=parseInt(time%(1000*60)/1000)
            sec=sec<10?('0'+sec):sec
            return parseInt(time/(1000*60))+":"+sec
        }
    },
    mounted(){
        this.getData()
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
        },
        current(v){
            this.getUrl(this.list[v].id)
        },
        url(v){
            this.buffering=true
            if(!this.wavesurfer){
                this.waveInit()
            }else{
                this.wavesurfer.load(v)
            }
        },
    },
    methods:{
        waveInit(){
            let wavesurfer=WaveSurfer.create({
                container:'#waveform',
                height:50,
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
            wavesurfer.on('ready',()=>{
                this.buffering=false
                if(this.wavesurfer&&this.current!==0){
                    this.wavesurfer.play()
                    this.play=true
                }
            })
            this.wavesurfer=wavesurfer
        },
        getData(){
            this.$axios({
                method:'get',
                url:'/personal_fm'
            }).then(res=>{
                console.log(res)
                if(res.data.code==200){
                    if(this.list.length==0){
                        this.getUrl(res.data.data[0].id)
                    }
                    this.list.push(...res.data.data)
                }
            })
        },
        getUrl(id){
            this.$axios({
                method:"get",
                url:'/song/url?id='+id
            }).then(res=>{
                if(res.data.code==200){
                    this.url=res.data.data[0].url
                }
            })
        },
        next(){//下一曲
        console.log(this.current)
            if(this.current+1<this.list.length){
                this.current++
            }
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
                filter: blur(60px);
                transform: scale(1.2);
                position: absolute;
                z-index: -1;
            }
        }
        .box{
            height:100%;
            display: flex;
            flex-direction: column;
            padding: 15px;
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
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .singers{
                        color: rgba($color: #448AFF, $alpha: 1);
                        text-align: center;
                        margin-top: 15px;
                        margin-bottom: 5px;
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
                        background: #fff;
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
                height: 100px;
                padding: 20px 0;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                margin-bottom: 20px;
                .current{
                    padding-right: 5px;
                    color: rgba($color: #fff, $alpha: 0.8);
                }
                .duration{
                    color: rgba($color: #fff, $alpha: 0.8);
                }
                .chart-box{
                    flex: 1;
                    position: relative;
                    .loading{
                        position: absolute;
                    }
                }
            }
        }
    }
</style>