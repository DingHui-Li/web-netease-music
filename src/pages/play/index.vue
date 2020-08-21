<template>
    <div id="play" v-scroll='scroll' ref='play'>
        <div class="play-box">
            <!-- <Ctrl :data='data' /> -->
            <Ctrl :data='data' :id='id'/>
        </div>
        <div class="bottom-box">
            <div class="comment">
                <Comment :id='id' type='music'/>
            </div>
            <div class="recommend">
                <Recommend :id='id'/>
            </div>
        </div>
    </div>
</template>

<script>
import Ctrl from './ctrl'
// import Lyric from './lyric'
import Recommend from './recommend'
import Comment from '../../components/comment'
export default {
    components:{Ctrl,Recommend,Comment},
    data(){
        return{
            id:this.$route.query.id,
            data:{},
            minimize:false
        }
    },
    created(){
        this.getData()
        this.getUrl()
    },
    methods:{
        getData(){
            this.$axios({
                method:'get',
                url:'/song/detail?ids='+this.id
            }).then(res=>{
                console.log(res)
                if(res.data.code==200){
                    this.data=res.data.songs[0]
                }
            })
        },
        getUrl(){
            this.$axios({
                method:'get',
                url:'/song/url?id='+this.id
            }).then(res=>{
                console.log(res)
            })
        },
        scroll(e){
            console.log(e)
        }
    },
    watch:{
        '$route'(route){
            if(route.name=='play'){
                this.id=route.query.id
                this.getData()
            }
        },
    }
}
</script>

<style lang='scss' scoped>
    #play{
        position: absolute;
        transition: .5s;
        width: 100%;
        height: 100%;
        transform: translateZ(0);
        background: #fff;
        overflow: auto;
        .play-box{
            position: relative;
            z-index: 9;
            background: #fff;
            transition: all .5s;
            overflow: hidden;
            height: calc(100vh - 75px);
        }
        .bottom-box{
            display: flex;
            padding:0 30px;
            .comment{
                flex:2
            }
            .recommend{
                flex: 1;
            }
        }
    }
</style>