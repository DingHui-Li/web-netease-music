<template>
    <div class="ctrl">
        <!-- <div class="bg">
            <img :src='album.cover+"?param=500y500"' alt="" srcset="" />
        </div> -->
        <div class="top">
            <div class="cover">
                <VueAspectRatio width='100%' ar='1:1' class="cover-box">
                    <q-img :src='album.cover+"?param=500y500"'></q-img>
                </VueAspectRatio>
            </div>
            <div class="info">
                <div class="album">{{album.name}}</div>
                <div class="name">{{data.name}}</div>
                <div class="singers">
                    <div v-for="singer in (data.artists||data.ar)" :key="singer.id" class="singer">
                        <!-- <q-avatar size="25px">
                            <img :src="singer.picUrl" alt="" srcset="">
                        </q-avatar> -->
                        <span>{{singer.name}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="album-cover">
                <VueAspectRatio width='100%' ar='1:1' class="cover-box">
                    <q-img :src='album.cover+"?param=500y500"'></q-img>
                </VueAspectRatio>
            </div>
            <div class="lyric">
                <ScrollArea>
                    <div v-for="time in Object.keys(lyric)" class="lyric-item">
                        <div>{{lyric[time].text}}</div>
                        <div>{{lyric[time].trtext}}</div>
                    </div>
                </ScrollArea>
            </div>
        </div>
    </div>
</template>

<script>
import ScrollArea from '../../components/scrollArea'
import VueAspectRatio from 'vue-aspect-ratio'
export default {
    components:{ScrollArea,VueAspectRatio},
    props:['data','id'],
    data(){
        return{
            lyric:{},
        }
    },
    mounted(){
        this.getLyric()
    },
    watch:{
        id(){
            this.getLyric()
        }
    },
    computed:{
        album(){
            if(this.data.id){
                return {
                    cover:this.data.album?this.data.album.picUrl:this.data.al.picUrl,
                    name:this.data.album?this.data.album.name:this.data.al.name
                }
            }
            return {
                cover:'',name:''
            }
        },
    },
    methods:{
        getLyric(){
            this.$axios({
                method:'get',
                url:'/lyric?id='+this.id,
            }).then(res=>{
                let lyric={}
                res.data.lrc.lyric.split('\n').map(item=>{
                    let index=item.indexOf(']')
                    let time=item.slice(1,index)
                    let text=item.slice(index+1)
                    lyric[time]={text}
                })
                if(res.data.tlyric.lyric) res.data.tlyric.lyric.split('\n').map(item=>{
                    let index=item.indexOf(']')
                    let time=item.slice(1,index)
                    let text=item.slice(index+1)
                    lyric[time]?lyric[time].trtext=text:lyric[time]={trtext:text}
                })
                this.lyric=lyric
            })
        }
    }
}
</script>

<style lang='scss' scoped>
    .ctrl{
        position: relative;
        width: 100%;
        height: 100%;
        padding: 15px;
        flex-direction: column;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        .bg{
            position: absolute;
            left:0;
            top:0;
            width: 100%;
            height: 100%;
            z-index: 0;
            background: rgba($color: #fff, $alpha: 0.5);
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                filter: blur(60px);
            }
        }
        .top{
            display: flex;
            position: relative;
            z-index: 1;
            .cover{
                width: 100px;
            }
            .info{
                padding-left: 15px;
                .album{
                    font-size: 1.1rem;
                    font-weight: bold;
                    color: rgba($color: #000, $alpha: 0.7);
                }
                .name{
                    font-size: 2rem;
                    font-weight: bold;
                }
                .singers{
                    overflow: hidden;
                    .singer{
                        float: left;
                        cursor: pointer;
                        margin-right: 10px;
                        span{
                            color: rgba($color: #000000, $alpha: 0.7);
                            line-height: 25px;
                            font-weight: bold;
                        }
                    }
                }
            }
        }
        .content{
            flex: 1;
            display: flex;
            .album-cover{
                width: 300px;
            }
            .lyric{
                width: 300px;
                font-size: 1rem;
                //font-weight: black;
                color: rgba($color: #000000, $alpha: 0.9);
                height: 100%;
                .lyric-item{
                    margin: 10px 0;
                }
            }
        }
    }
</style>