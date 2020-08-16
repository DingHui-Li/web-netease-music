<template>
    <q-scroll-area id='scroll'  :thumb-style="thumbStyle" :bar-style="barStyle">
        <slot></slot>
    </q-scroll-area>
</template>

<script>
export default {
    computed: {
        thumbStyle () {
        return {
            right: '4px',
            borderRadius: '5px',
            backgroundColor: '#027be3',
            width: '5px',
            opacity: 0.75
        }
        },

        barStyle () {
        return {
            right: '2px',
            borderRadius: '9px',
            backgroundColor: '#027be3',
            width: '9px',
            opacity: 0.2
        }
        }
    }
}
</script>

<style lang='scss' scoped>
    #scroll{
        position: relative;
        height: 100%;
        padding: 0 15px;
    }
</style>