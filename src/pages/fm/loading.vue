<template>
    <div class="loading" ref='container'>
        <div class="item" v-for="i in count" :key='i' :style="`animation-delay:${i*10}ms`"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            count:0
        }
    },
    mounted(){
        this.count=parseInt(this.$refs.container.offsetWidth/(4+2))
    },
    methods:{
        
    }
}
</script>

<style lang='scss' scoped>
    .loading{
        width: 100%;
        overflow: hidden;
        .item{
            width: 4px;
            height: 40px;
            background: grey;
            float: left;
            // border: 1px solid #000;
            margin-right: 2px;
            overflow: hidden;
            animation: animate 2s infinite;
        }
    }
    @keyframes animate{
        0%{
            opacity: 0;
        }
        50%{
            opacity: 1;
        }
        100%{
            opacity: 0;
        }
    }
</style>