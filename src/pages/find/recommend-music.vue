<template>
    <div id='recommend-music'>
        <div class="title">推荐音乐<span>更多</span></div>
        <div class="item-container">
            <div class="item-box" v-for="music in musics" :key='music.id'>
                <div class="item">
                    <vue-aspect-ratio width="100%" ar='4:3'>
                        <div class="cover">
                            <img :src="music.picUrl+'?param=500y500'" alt="" srcset="">
                        </div>
                    </vue-aspect-ratio>
                    <div class="title-bg">
                        <div class="title-box">
                            <div class="name">{{music.name}}</div>
                            <div class="singers">
                                <span v-for="singer in music.song.artists">{{singer.name}}/</span>
                            </div>
                        </div>
                    </div>
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
                url:'/personalized/newsong'
            }).then(res=>{
                if(res.data.code==200){
                    this.musics=res.data.result.slice(0,9)
                }
            })
        }
    }
}
</script>

<style lang='scss' scoped>
    #recommend-music{
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
                width: 33.3333%;
                padding: 10px;
                .item{
                    border-radius: 10px;
                    overflow: hidden;
                    position: relative;
                    box-shadow: 0 10px 20px 0px rgba($color: #000000, $alpha: 0.05);
                    transition:  all .5s;
                    cursor: pointer;
                    &:hover{
                        box-shadow: 5px 10px 20px 10px rgba($color: #000000, $alpha: .2);
                    }
                    .cover{
                        overflow: hidden;
                        height: 100%;
                        img{
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            transition: transform .4s;
                            transition-timing-function: ease-out;
                            &:hover{
                                transform: scale(1.4);
                            }
                        }
                    }
                    .title-bg{
                        //position: absolute;
                        z-index: 0;
                        height: 40%;
                        width: 100%;
                        padding: 10px 0;
                        bottom: 0;
                        background: rgba($color: #fff, $alpha: 0.6);
                        // backdrop-filter: blur(10px);
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: flex-start;
                        .title-box{
                            width: 100%;;
                            padding:0 15px;
                            .name{
                                font-weight: bold;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                word-wrap: none;
                                pointer-events: none;
                                font-size: 1rem;
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
                }
            }
        }
    }
</style>