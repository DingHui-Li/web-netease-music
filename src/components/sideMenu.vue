<template>
    <div id='side-menu'>
        <div class="selected" :style="`top:${selectedIndex*40+15}px`"></div>
        <div class="item" v-for="(menu,index) in menus" @click="()=>{$router.push(menu.router);selectedIndex=index}" v-ripple="{ color: 'white' }"
            :style="`color:${selectedIndex==index?'#fff':'#000'}`">
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
                    router:'/find'
                },
                {
                    icon:'broadcast-tower',
                    title:'私人FM',
                    router:'/fm'
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
            selectedIndex:0
        }
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
            transition: all .8s;
            cursor: pointer;
            user-select: none;
            span{
                margin-left: 20px;
            }
        }
        .selected{
            position: absolute;
            z-index: 0;
            background: $primary;
            width: 220px;
            height: 40px;
            transition: top .2s;
            transition-timing-function:ease-out;
            border-radius: 5px;
        }
    }
</style>