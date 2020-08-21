<template>
        <div class="left">
            <div class="bg" :style="`background-color:rgb(${color})`"></div>
            <VueAspectRatio width='100%' ar='1:1' class="cover-box">
                <q-img :src='cover+"?param=500y500"'></q-img>
            </VueAspectRatio>
            <div class="box">
                <div class="info">
                    <div class="name">{{data.name}}</div>
                    <div class="singer">
                        <span v-for="singer in data.artists">{{singer.name}}/</span>
                    </div>
                </div>
                <div class="actions">
                    <div>
                        <q-btn class="btn" round icon='fas fa-step-backward' flat></q-btn>
                    </div>
                    <div>
                        <q-btn class="btn" round icon='fas fa-play' size="lg" flat></q-btn>
                    </div>
                    <div>
                        <q-btn class="btn" round icon='fas fa-step-forward' flat></q-btn>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import VueAspectRatio from 'vue-aspect-ratio'
import ColorThief from 'colorthief'
export default {
    props:{
        data:{
            type:Object,
            default:()=>{}
        }
    },
    components:{VueAspectRatio},
    data(){
        return{
            color:[]
        }
    },
    computed:{
        cover(){
            if(this.data.id){
                return this.data.album?this.data.album.picUrl:this.data.al.picUrl
            }
            return ''
        }
    },
    mounted(){
        console.log(this.data)
        this.getColor()
    },
    watch:{
        data(){
            this.getColor()
        }
    },
    methods:{
        async getColor(){
            let cf=new ColorThief()
            let res=await this.$axios({
                method:'get',
                url:this.cover+"?param=500y500",
                responseType:'blob'
            })
            let url=window.URL.createObjectURL(res.data)
            let img=new Image()
            img.src=url
            let _this=this
            img.onload=async function(){
                _this.color=await cf.getColor(this)
            }
        }
    },
}
</script>

<style lang='scss' scoped>
    .left{
        position: relative;
        bottom: 0;
        width: 100%;
        height: 100%;
        //max-height: 700px;
        background: radial-gradient(circle farthest-side at 0 100%,rgba(#000,0.7),rgba(#000,0));
        box-shadow: 10px 0 20px 1px rgba($color: #000000, $alpha: 0.1);
        //border-radius: 30px 30px 0 0;
        .bg{
            width: 100%;
            height: 100%;
            //border-radius: 30px 30px 0 0;
            position: relative;
            z-index: -1;
            overflow: hidden;
        }
        .cover-box{
            width: 100%;
            background: red;
            position: absolute;
            top:50%;
            transform: translate(15%,-50%);
            box-shadow: 10px 0 20px 1px rgba($color: #000000, $alpha: 0.1);
            border-radius: 30px;
            overflow: hidden;
        }
        .box{
            position: absolute;
            bottom: 0;
            z-index: 9;
            width: 100%;
            .info{
                padding:15px;
                .name{
                    text-align: right;
                    font-size: 1.2rem;
                    color: #fff;
                }
                .singer{
                    color: rgba($color: #fff, $alpha: 0.7);
                    text-align: right;
                    margin-top: 5px;
                    cursor: pointer;
                    span:hover{
                        color: #fff;
                    }
                }
            }
            .actions{
                display: flex;
                align-items: center;
                padding-bottom: 10px;
                div{
                    flex: 1;
                    text-align: center;
                }
                .btn{
                    color: #fff;
                }
            }
        }
    }
</style>