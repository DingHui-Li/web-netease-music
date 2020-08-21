<template>
    <div class="right">
        <div class="title">相似歌曲</div>
        <div class="row">
            <div class="col-md-4 col-lg-3" v-for="music in similars" :key='music.id' style="padding:10px">
                <SongBlockItem :music='music'/>
            </div>
        </div>
    </div>
</template>

<script>
import SongBlockItem from '../../components/songBlockItem'
export default {
    components:{SongBlockItem},
    props:['id'],
    data(){
        return{
            similars:[]
        }
    },
    created(){
        this.getSimilar()
    },
    watch:{
        id(){
            this.getSimilar()
        }
    },
    methods:{
        getSimilar(){
            this.$axios({
                method:'get',
                url:'/simi/song?id='+this.id
            }).then(res=>{
                console.log(res)
                if(res.data.code==200){
                    this.similars=res.data.songs
                }
            })
        }
    }
}
</script>

<style lang='scss' scoped>
    .right{
        flex: 1;
        height: 100%;
        overflow: auto;
        .title{
            padding: 15px;
            padding-bottom: 0;
            font-size: 1.4rem;
            font-weight: bold;
            color: rgba($color: #000000, $alpha: .8);
            overflow: hidden;
            span{
                float: right;
                font-size: 15px;
                color: rgba($color: #000000, $alpha: 0.4);
                cursor: pointer;
            }
        }
    }
</style>