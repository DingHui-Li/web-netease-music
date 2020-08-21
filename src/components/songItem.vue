<template>
    <div class="song-item" @click="$router.push({name:'play',query:{id:data.id},params:data})">
        <div class="index">{{index}}</div>
        <img :src="data.al.picUrl+'?param100y100'" alt="" srcset="">
        <div class="name">{{data.name}}</div>
        <div class="singers">
            <span v-for="singer in data.ar" :key="singer.id">{{singer.name}}/</span>
        </div>
        <div class="album">
            {{data.al.name}}
        </div>
        <div class="duration">{{duration}}</div>
    </div>
</template>

<script>
export default {
    props:['data','index'],
    computed:{
        duration(){
            let time=this.data.dt
            let sec=parseInt(time%(1000*60)/1000)
            sec=sec<10?('0'+sec):sec
            return parseInt(time/(1000*60))+":"+sec
        }
    }
}
</script>

<style lang='scss' scoped>
    .song-item{
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
        align-items: center;
        justify-content: space-between;
        overflow: hidden;
        padding: 10px;
        border-radius: 10px;
        background: #fff;
        transition: all .5s;
        box-sizing: border-box;
        &:hover{
            box-shadow: 1px 1px 10px 1px rgba($color: #000000, $alpha: 0.1);
        }
        .index{
            width: 50px;
            font-weight: bold;
        }
        img{
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 5px;
        }
        .name{
            flex: 1;
            width: 150px;
            padding: 0 10px;
            font-weight: bold;
            font-size: 1rem;
            overflow: hidden;
            white-space: nowrap;
            word-wrap: none;
            text-overflow: ellipsis;
        }
        .singers{
            flex:1;
            width: 0;
            overflow: hidden;
            padding: 0 10px;
            white-space: nowrap;
            word-wrap: none;
            text-overflow: ellipsis;
        }
        .album{
            flex:1;
            padding: 0 10px;
            white-space: nowrap;
            word-wrap: none;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .duration{
            width: 50px;
            text-align: right;
        }
    }
</style>