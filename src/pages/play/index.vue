<template>
    <div id="play">
        <div class="left-box">
            <Left :data='data'/>
        </div>
        <div class="mid-box">
            <Mid :data='data'/>
        </div>
        <div class="right-box"></div>
    </div>
</template>

<script>
import Left from './left'
import Mid from './mid'
export default {
    components:{Left,Mid},
    data(){
        return{
            id:this.$route.query.id,
            data:this.$route.params
        }
    },
    created(){

    },
    watch:{
        '$route'(route){
            if(route.name=='play'){
                this.id=route.query.id
                this.data=route.params
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
        overflow: auto;
        transform: translateZ(0);
        background: #fff;
        display: flex;
        padding: 30px;
        padding-top: 0;
        padding-bottom: 100px;
        .left-box{
            flex:2;
            max-width: 300px;
            height: 100%;
            padding-top: 20px;
        }
        .mid-box{
            flex: 3;
            height: 100%;
            padding-left: 50px;
        }
        .right-box{
            flex: 1;
            height: 100%;
            background: blue;
        }
    }
</style>