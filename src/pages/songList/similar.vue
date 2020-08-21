<template>
    <div class="similar">
        <div class="title">相关歌单推荐</div>
        <div class="row">
            <div class="col-xs-12 col-lg-6" v-for="item in data" :key="item.id" style="padding:10px">
                <SongListItem :data='item'/>
            </div>
        </div>
    </div>
</template>

<script>
import VueAspectRatio from 'vue-aspect-ratio'
import SongListItem from '../../components/songListItem'
export default {
    components:{VueAspectRatio,SongListItem},
    props:['id'],
    data(){
        return{
            data:[]
        }
    },
    created(){
        this.getData()
    },
    watch:{
        id(){
            this.getData()
        }
    },
    methods:{
        getData(){
            this.$axios({
                method:'get',
                url:'/related/playlist?id='+this.id
            }).then(res=>{
                if(res.data.code==200){
                    this.data=res.data.playlists
                }
            })
        }
    }
}
</script>

<style lang='scss' scoped>
    .similar{
        position: relative;
        //padding-bottom: 100px;
        .title{
            font-size:1.3rem;
            font-weight:bold;
            padding-left: 10px;
        }
        .item{
            width: 100%;
            height: 100%;
            background: $primary;
        }
    }
</style>