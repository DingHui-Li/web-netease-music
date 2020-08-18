<template>
    <div class="mid">
        <div class="album">{{data.album.name}}</div>
        <div class="name">{{data.name}}</div>
        <div class="singers">
            <div v-for="singer in data.artists" :key="singer.id" class="singer">
                <q-avatar size="25px">
                    <img :src="singer.picUrl" alt="" srcset="">
                </q-avatar>
                <span>{{singer.name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['data'],
    data(){
        return{
            lyric:[]
        }
    },
    mounted(){
        this.getLyric()
    },
    methods:{
        getLyric(){
            this.$axios({
                method:'get',
                url:'/lyric?id=1471026229',
            }).then(res=>{
                console.log(res)
            })
        }
    }
}
</script>

<style lang='scss' scoped>
    .mid{
        width: 100%;
        height: 100%;
        padding-top: 20px;
        // background: red;
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
                    margin-left: 5px;
                    color: rgba($color: #000000, $alpha: 0.7);
                    line-height: 25px;
                }
            }
        }
    }
</style>