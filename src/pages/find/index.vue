<template>
    <div id='find'>
            <!-- <div class="top">
                <div class="left">
                    <q-carousel v-model="slide" swipeable animated navigation class="carousel" 
                        transition-prev="jump-right" transition-next="jump-left">
                        <q-carousel-slide v-for="(i,index) in carousels" :name="index+''" :key='index'>
                            <div class="carousel-slide">
                                <img :src="i" alt="" srcset="">
                            </div>
                        </q-carousel-slide>
                    </q-carousel>
                    <div class="bottom">
                        <div class="item" v-for="item in items" :key='item.title'>
                            <img class="bg" :src="item.cover" alt="" srcset="">
                            <div class="title-bg">
                                
                            </div>
                            <div class="title">{{item.title}}</div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="title">最新音乐<span>更多</span></div>
                    <ScrollArea>
                        <MusicItem v-for="song in newSongs.slice(0,10)" :key="song.id" :data='song'/>
                    </ScrollArea>
                </div>
            </div> -->
            <div class="bottom">
                <div class="songs">
                    <RecommendSongList />
                </div>
                <div class="recommend-music">
                    <RecommendMusic />
                </div>
            </div>
    </div>
</template>

<script>
import VueAspectRatio from "vue-aspect-ratio";
import MusicItem from './musicItem'
import ScrollArea from '../../components/scrollArea'
import RecommendMusic from './recommend-music'
import RecommendSongList from './recommend-song-list'
export default {
    components:{
        VueAspectRatio,
        MusicItem,ScrollArea,RecommendMusic,RecommendSongList
    },
    data(){
        return{
            slide:'0',
            carousels:[
                'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1432086265,2127261784&fm=26&gp=0.jpg',
                'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1958847781,2941395603&fm=26&gp=0.jpg',
                'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2863595005,2326737300&fm=26&gp=0.jpg'
            ],
            newSongs:[],
            items:[
                {
                    title:'最新专辑',
                    cover:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1836544220,3867566329&fm=26&gp=0.jpg'
                },
                {
                    title:'最新MV',
                    cover:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597477973772&di=a759c9c3d8c2b09f9afb717b023bc1bc&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F1%2F59a64a0d601df.jpg'
                },
                {
                    title:'推荐电台',
                    cover:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597477973770&di=02457afee50623c0719b4bed7369cf88&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F6%2F59b8a18461ecb.jpg'
                },
            ]
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            this.$axios({
                method:'get',
                url:'/top/song'
            }).then(res=>{
                if(res.data.code==200){
                    this.newSongs=res.data.data
                }
            })
        }
    }
}
</script>

<style lang='scss' scoped>
    #find{
        width: 100%;
        height: 100%;
        position: absolute;
        transition-duration: 0.5s;
        padding: 15px 0;
        padding-top: 0;
        z-index: 1;
        box-sizing: border-box;
        background: #fff;
        overflow: auto;
        transform: translateZ(0);
        .top{
            position: relative;
            height:calc(100% * 0.7);
            //max-height:700px;
            display: flex;
            flex-direction: row;
            overflow: hidden;
            .left{
                flex: 1;
                display: flex;
                flex-direction: column;
                .carousel{
                    flex: 1;
                    width: 100%;
                    background: transparent;
                    .carousel-slide{
                        border-radius: 10px;
                        width: 100%;
                        height: 100%;
                        position: relative;
                        overflow: hidden;
                        user-select: none;
                        pointer-events: none;
                        img{
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                    }
                }
                .bottom{
                    height: 150px;
                    width: 100%;
                    background: transparent;
                    position: relative;
                    display: flex;
                    flex-direction: row;
                    padding: 0 5px;
                    overflow: hidden;
                    .item{
                        flex: 1;
                        height: 100%;
                        margin: 0 10px;
                        background: transparent;
                        border-radius: 10px;
                        overflow: hidden;
                        position: relative;
                        .bg{
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            position: absolute;
                            top: 0;
                            left: 0;
                            z-index: 0;
                            //filter: blur(30px);
                            transform: scale(1);
                            transition: transform .5s;
                            cursor: pointer;
                            &:hover{
                                //filter: blur(0);
                                transform: scale(1.7);
                            }
                        }
                        .title-bg{
                            position: absolute;
                            z-index:1;
                            height: 50%;
                            width: 100%;
                            top:50%;
                            transform: translateY(-50%);
                            //backdrop-filter: blur(10px);
                            background: rgba($color: #fff, $alpha: 0.5);
                            pointer-events: none;
                        }
                        .title{
                            position: absolute;
                            z-index: 2;
                            width: 100%;
                            top: 50%;
                            text-align: center;
                            transform: translateY(-50%);
                            font-size: 1.2rem;
                            color: rgba($color: #000000, $alpha: 0.7);
                            font-weight: bold;
                            pointer-events: none;
                        }
                    }
                }
            }
            .right{
                width: 40%;
                max-width: 500px;
                background: transparent;
                overflow: hidden;
                // display: flex;
                // flex-direction: column;
                height:100%;
                position: relative;
                .title{
                    padding: 0 20px;
                    font-size: 1.4rem;
                    font-weight: bold;
                    color: rgba($color: #000000, $alpha: 0.8);
                    margin-bottom: 15px;
                    overflow: hidden;
                    user-select: none;
                    span{
                        float: right;
                        font-size: 15px;
                        color: rgba($color: #000000, $alpha: 0.4);
                        cursor: pointer;
                    }
                }
            }
        }
        .bottom{
            display: flex;
            flex-direction: row;
            .recommend-music{
                flex: 1;
            }
            .songs{
                flex: 4;
                padding: 0 15px;
            }
        }
    }
</style>
