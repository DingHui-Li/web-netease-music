<template>
    <div class="song-block-item" @click="$router.push({name:'play',query:{id:music.id}})">
        <vue-aspect-ratio width="100%" ar='1:1'>
            <div class="cover">
                <q-img :src="(music.picUrl||music.album.picUrl)+'?param=500y500'"  transition="jump-down"/>
            </div>
        </vue-aspect-ratio>
        <div class="title-bg">
            <div class="title-box">
                <div class="name">{{music.name}}</div>
                <div class="singers">
                    <span v-for="singer in singers">{{singer.name}}/</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueAspectRatio from 'vue-aspect-ratio'
export default {
    props:{
        music:{
            type:Object,
            default:()=>{}
        }
    },
    components:{VueAspectRatio},
    computed:{
        singers(){
            return this.music.song?this.music.song.artists:this.music.artists
        }
    }
}
</script>

<style lang='scss' scoped>
    .song-block-item{
        border-radius: 10px;
        position: relative;
        cursor: pointer;
        .cover{
            overflow: hidden;
            height: 100%;
            border-radius: 10px;
            box-shadow: 0 10px 20px 0px rgba($color: #000000, $alpha: 0.05);
            transition:  all .5s;
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
            //background: rgba($color: #fff, $alpha: 0.6);
            // backdrop-filter: blur(10px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            overflow: hidden;
            .title-box{
                width: 100%;
                text-align: left;
                .name{
                    font-weight: bold;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    word-wrap: none;
                    pointer-events: none;
                    font-size: 0.8rem;
                    color: rgba($color: #000000, $alpha: .7);
                }
                .singers{
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    word-wrap: none;
                    font-size: 0.7rem;
                    color:grey;
                    cursor: pointer;
                    span:hover{
                        color: rgba($color: #000000, $alpha: 0.6);
                    }
                }
            }
        }
    }
</style>