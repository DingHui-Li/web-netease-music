<template>
    <div id='song-list'>
        <div class="left">
            <InfoCard :detil='detil'/>
            <q-tabs v-model="tab">
                <q-tab label='歌曲列表' name="songs"></q-tab>
                <q-tab label='评论' name='comment'></q-tab>
            </q-tabs>
            <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="songs">
                    <SongItem v-for="song in detil.tracks" :key="song.id" :data='song' />
                </q-tab-panel>
                <q-tab-panel name="comment">
                    <div>comment</div>
                </q-tab-panel>
            </q-tab-panels>
        </div>
        <div class="right"></div>
    </div>
</template>

<script>
import InfoCard from './info'
import SongItem from '../../components/songItem'
export default {
    components:{InfoCard,SongItem},
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
                url:`/song/detail?ids=${ids}`
            }).then(res=>{
                console.log(res)
            })
        }
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
        // height: 100%;
        transition-duration: 0.5s;
        display: flex;
        flex-direction: row;
        background: #fff;
        padding-bottom: 100px;
        .left{
            flex: 2;
            height: 100%;
            padding: 15px;
            padding-top: 0;
            position: relative;
            .q-tab-panel{
                padding:10px 0;
            }
        }
        .right{
            flex: 1;
            height: 100%;
            background: green;
        }
    }
</style>