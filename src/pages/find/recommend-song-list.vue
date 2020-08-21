<template>
    <div id='recommend-song-list'>
        <div class="title">推荐歌单<span>更多</span></div>
        <div class="row">
            <div class="col-sm-4 col-mg-4 col-lg-4 col-xl-3 item-box" v-for="music in musics" :key='music.id'>
                <SongListItem :data='music'/>
            </div>
        </div>
    </div>
</template>

<script>
import SongListItem from '../../components/songListItem'
export default {
    components:{SongListItem},
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
                url:'/personalized?limit=20'
            }).then(res=>{
                console.log(res)
                if(res.data.code==200){
                    this.musics=res.data.result
                }
            })
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
        .item-box{
            padding: 15px;
        }
    }
</style>