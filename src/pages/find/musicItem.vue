<template>
    <div id='music-item' @click="$router.push({name:'play',query:{id:data.id},params:data})">
        <!-- <div>
            <q-btn class="btn" icon='fas fa-heart-outline' size="xs" flat outline round color="red" />
        </div> -->
        <div class="cover">
            <img :src="data.album.blurPicUrl+'?param=100y100'" alt="" srcset="">
        </div>
        <div class="name-singer">
            <div class="name">{{data.name}}</div>
            <div class="singer">{{singer}}</div>
        </div>
        <div class="duration">{{duration}}</div>
    </div>
</template>

<script>
export default {
    props:{
        data:{
            type:Object,
            default:{}
        }
    },
    computed:{
        singer(){
            let temp= this.data.artists.reduce((cur,item)=>cur+' / '+item.name,'')
            return temp.substr(2)
        },
        duration(){
            let time=this.data.bMusic.playTime
            let sec=parseInt(time%(1000*60)/1000)
            sec=sec<10?('0'+sec):sec
            return parseInt(time/(1000*60))+":"+sec
        }
    }
}
</script>

<style lang='scss' scoped>
    #music-item{
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0px 10px 20px 0px rgba($color: #000000, $alpha: 0.05);
        padding: 10px 20px;
        margin: 0 10px;
        margin-bottom: 15px;
        border-radius: 5px;
        overflow: hidden;
        transition: all .3s;
        cursor: pointer;
        &:hover{
            box-shadow: 0px 5px 10px 1px rgba($color: #000000, $alpha: 0.2);
        }
        .btn{
            border: 1px solid red;
        }
        .cover{
            position: relative;
            width: 50px;
            height: 50px;
            box-shadow: 0px 2px 5px 1px rgba($color: #000000, $alpha: 0.2);
            margin-right: 10px;
            border-radius: 5px;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .name-singer{
            // white-space: nowrap;
            // text-overflow: ellipsis;
            // word-wrap: none;
            position: relative;
            flex: 1;
            margin-right: 10px;
            overflow: hidden;
            .name{
                font-weight: bold;
                font-size: 15px;
                color: rgba($color: #000000, $alpha: 0.7);
            }
            .singer{
                color: grey;
                white-space: nowrap;
                text-overflow: ellipsis;
                word-wrap: none;
            }
        }
    }
</style>