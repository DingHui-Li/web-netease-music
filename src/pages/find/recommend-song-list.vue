<template>
    <div id='recommend-song-list'>
        <div class="title">推荐歌单<span>更多</span></div>
        <div class="item-container">
            <div class="item-box" v-for="music in musics" :key='music.id' 
                @click="$router.push({name:'song-list',query:{id:music.id},params:music})">
                <div class="item">
                    <vue-aspect-ratio width="100%" ar='4:3'>
                        <div class="cover">
                            <img :src="music.picUrl" alt="" srcset="">
                        </div>
                    </vue-aspect-ratio>
                    <div class="title-bg">
                        <div class="title-box">
                            <div class="name">{{music.name}}</div>
                            <!-- <div class="singers">
                                <span v-for="singer in music.song.artists">{{singer.name}}</span>
                            </div> -->
                        </div>
                    </div>
                    <div class="play-count">{{playCount(music.playCount)}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueAspectRatio from 'vue-aspect-ratio'
export default {
    components:{VueAspectRatio},
    data(){
        return{
            musics:[]
        }
    },
    created(){
        this.getData()
    },
    methods:{
        getData(){
            this.$axios({
                method:'get',
                url:'/personalized?limit=4'
            }).then(res=>{
                console.log(res)
                if(res.data.code==200){
                    this.musics=res.data.result
                }
            })
        },
        playCount(count){
            return count>10000?parseInt(count/10000)+'w':count
        }
    }
}
</script>

<style lang='scss' scoped>
    #recommend-song-list{
        .title{
            padding: 15px;
            padding-bottom: 0;
            font-size: 1.4rem;
            font-weight: bold;
            color: rgba($color: #000000, $alpha: .8);
            overflow: hidden;
            padding-right:25px;
            span{
                float: right;
                font-size: 15px;
                color: rgba($color: #000000, $alpha: 0.4);
                cursor: pointer;
            }
        }
        .item-container{
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            padding:0 10px;
            // justify-content: center;
            .item-box{
                width: 50%;
                padding: 10px;
                .item{
                    border-radius: 10px;
                    height: 100%;
                    overflow: hidden;
                    position: relative;
                    box-shadow: 0 10px 20px 0px rgba($color: #000000, $alpha: 0.05);
                    transition:  all .5s;
                    cursor: pointer;
                    &:hover{
                        box-shadow: 5px 10px 20px 10px rgba($color: #000000, $alpha: .2);
                    }
                    .cover{
                        position: relative;
                        height: 100%;
                        overflow: hidden;
                        img{
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            transition: all .5s;
                            // &:hover{
                            //     transform: scale(1.3);
                            // }
                        }
                    }
                    .title-bg{
                        position: relative;
                        z-index: 0;
                        // height: 40%;
                        padding: 10px 0;
                        width: 100%;
                        bottom: 0;
                        background: rgba($color: #fff, $alpha: 0.7);
                        // backdrop-filter: blur(10px);
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: flex-start;
                        .title-box{
                            width: 100%;;
                            padding:0 15px;
                            height: 50px;
                            line-height: 50px;
                            .name{
                                font-weight: bold;
                                font-size: 1.1rem;
                                color: rgba($color: #000000, $alpha: .8);
                            }
                            .singers{
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                word-wrap: none;
                                cursor: pointer;
                                span:hover{
                                    color: rgba($color: #000000, $alpha: 0.6);
                                }
                            }
                        }
                    }
                    .play-count{
                        position: absolute;
                        top:0;
                        right: 0;
                        z-index: 1;
                        padding:2px 10px;
                        padding-left: 20px;
                        color: #fff;
                        background: linear-gradient(to left, rgba(#000,0.5),rgba(#000,0));
                    }
                }
            }
        }
    }
</style>