<template>
    <div id='recommend-music'>
        <div class="title">推荐音乐<span>更多</span></div>
        <div class="row">
            <div class="col-xs-6 col-lg-4" v-for="music in musics" :key='music.id'>
                <div class="item-box">
                    <SongBlockItem :music='music'/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import SongBlockItem from '../../components/songBlockItem'
export default {
    components:{SongBlockItem},
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
    #recommend-music{
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
        .item-box{
            padding: 10px;
        }
    }
</style>