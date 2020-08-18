<template>
    <div id='song-list' ref='songList'>
        <div class="left">
            <InfoCard :detil='detil'/>
            <q-tabs v-model="tab">
                <q-tab label='歌曲列表' name="songs"></q-tab>
                <q-tab :label='`评论(${detil.commentCount})`' name='comment'></q-tab>
            </q-tabs>
            <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="songs">
                    <SongItem v-for="(song,index) in detil.tracks" :key="song.id" :data='song' :index='index+1'/>
                </q-tab-panel>
                <q-tab-panel name="comment">
                    <Comment :id='id'/>
                </q-tab-panel>
            </q-tab-panels>
        </div>
        <div class="right">
            <Similar v-if='detil.trackIds' :id='detil.trackIds[0].id'/>
        </div>
    </div>
</template>

<script>
import InfoCard from './info'
import Similar from './similar'
import SongItem from '../../components/songItem'
import Comment from './comment/index'
export default {
    components:{InfoCard,SongItem,Similar,Comment},
    data(){
        return{
            id:this.$route.query.id,
            detil:this.$route.params,
            tab:'songs'
        }
    },
    created(){
        this.getDetil()
    },
    methods:{
        getDetil(){
            this.$axios({
                method:'get',
                url:`/playlist/detail?id=${this.id}`
            }).then(res=>{
                if(res.data.code==200){
                    console.log(res.data.playlist)
                    this.detil=res.data.playlist
                    //this.getSongsDetil(res.data.playlist.trackIds.map(item=>item.id))
                }
            })
        },
        getSongsDetil(ids){
            this.$axios({
                method:'get',
                url:`/song/detail?id=347230`
            }).then(res=>{
                console.log(res.data)
            })
        },
    },
    watch:{
        '$route'(route){
            if(route.name=='song-list'){
                if(this.id!==route.query.id){
                    this.id=route.query.id
                    this.detil=route.params
                    this.$nextTick(()=>this.getDetil())
                }
            }
        }
    }
}
</script>

<style lang='scss' scoped>
    #song-list{
        position: absolute;
        width: 100%;
        height: 100%;
        transition-duration: 0.7s;
        display: flex;
        flex-direction: row;
        justify-content: center;
        background-color: white;
        box-sizing: border-box;
        overflow: auto;
        //opacity:1;
        transform: translateZ(0);
        .left{
            flex: 2;
            padding: 15px;
            padding-top: 0;
            position: relative;
            margin: 0;
            box-sizing: border-box;
            .q-tab-panel{
                box-sizing: border-box;
                padding:10px 0;
                padding-right:10px;
                padding-bottom: 100px;
            }
        }
        .right{
            flex: 1;
        }
    }
</style>