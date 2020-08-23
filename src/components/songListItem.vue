<template>
    <div class="song-list-item animate__animated animate__fadeIn" @click="$router.push({name:'song-list',query:{id:data.id},params:data})">
        <vue-aspect-ratio width="100%" ar='1:1'>
            <div class="cover">
                <q-img class="img" :src="(data.picUrl||data.coverImgUrl)+'?param=500y500'" alt="" srcset="" transition="jump-down"></q-img>
                <div class="name">{{data.name}}</div>
            </div>
        </vue-aspect-ratio>
        <div class="title-bg" v-show="data.copywriter">
            <div class="title-box">
                <!-- <div class="name">{{data.name}}</div> -->
                <div class="writer">{{data.copywriter}}</div>
            </div>
        </div>
        <div class="play-count" v-show="playCount">{{playCount}}</div>
    </div>
</template>

<script>
import 'animate.css'
import VueAspectRatio from 'vue-aspect-ratio'
export default {
    props:['data'],
    components:{VueAspectRatio},
    computed:{
        playCount(){
            let count=this.data.playCount
            return count>10000?parseInt(count/10000)+'w':count
        }
    }
}
</script>

<style lang='scss' scoped>
    .song-list-item{
        height: 100%;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
        //box-shadow: 0 10px 20px 0px rgba($color: #000000, $alpha: 0.05);
        transition:  all .5s;
        cursor: pointer;
        // &:hover{
        //     box-shadow: 5px 10px 20px 10px rgba($color: #000000, $alpha: .2);
        // }
        .cover{
            position: relative;
            height: 100%;
            overflow: hidden;
            border-radius: 10px;
            .img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: all .5s;
                // &:hover{
                //     transform: scale(1.3);
                // }
            }
            .name{
                position: absolute;
                z-index: 2;
                border-radius:0 0 10px 10px;
                width: 100%;
                bottom: 0;
                padding: 15px;
                backdrop-filter: blur(5px);
                background: rgba($color: #fff, $alpha: 0.5);
                font-weight: bold;
                font-size: 0.9rem;
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
                // line-height: 50px;
                .name{
                    font-weight: bold;
                    font-size: 1rem;
                    color: rgba($color: #000000, $alpha: .7);
                }
                .writer{
                    font-size: 0.8rem;
                    color: grey;
                }
            }
        }
        .play-count{
            position: absolute;
            top:10px;
            right: 10px;
            z-index: 1;
            padding:2px 10px;
            //padding-left: 20px;
            color: #fff;
            background: rgba($color: $primary, $alpha: 1);
            //background: linear-gradient(to left, rgba(#000,0.5),rgba(#000,0));
            border-radius: 30px;
        }
    }
</style>