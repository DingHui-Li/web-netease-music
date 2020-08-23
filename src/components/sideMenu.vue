<template>
    <div id='side-menu'>
        <!-- <div class="selected" :style="`top:${selectedIndex*40+15}px`"></div> -->
        <div :class="`item ${selected==menu.name?'selected':''}`" v-for="(menu,index) in menus" @click="()=>{$router.push(menu.router);selected=menu.name}" v-ripple="{ color: 'white' }">
            <q-icon :name='"fas fa-"+menu.icon'></q-icon> 
            <span>{{menu.title}}</span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            menus:[
                {
                    icon:'music',
                    title:'发现音乐',
                    router:'/find',
                    name:'find'
                },
                {
                    icon:'broadcast-tower',
                    title:'私人FM',
                    router:'/fm',
                    name:'fm'
                },
                {
                    icon:'heart',
                    title:'我喜欢的音乐',
                    router:'/fm'
                },
                {
                    icon:'list-ul',
                    title:'创建的歌单',
                    router:'/fm'
                },
                {
                    icon:'stream',
                    title:'收藏的歌单',
                    router:'/fm'
                },
            ],
            selected:'find'
        }
    },
    mounted(){
        this.selected=this.$route.name
    }
}
</script>

<style lang='scss' scoped>
    #side-menu{
        width: 100%;
        height: 100%;
        background: rgba($color: #fff, $alpha: 0.5);
        padding: 15px;
        position: relative;
        .item{
            position: relative;
            z-index: 1;
            padding:0 10px;
            border-radius: 5px;
            height: 40px;
            line-height: 40px;
            //transition: all .8s;
            cursor: pointer;
            user-select: none;
            span{
                margin-left: 20px;
            }
        }
        .selected{
            // position: absolute;
            // z-index: 0;
            background: $primary;
            color:#fff
            // width: calc(100% - 30px);
            // height: 40px;
            // transition: top .2s;
            // transition-timing-function:ease-out;
            // border-radius: 5px;
        }
    }
</style>