<template>
    <div id='home'>
        <div class="top">
            <div class="left">
                <q-carousel v-model="slide" swipeable animated navigation class="carousel"
                    transition-prev="jump-right" transition-next="jump-left">
                    <q-carousel-slide name="1">

                    </q-carousel-slide>
                    <q-carousel-slide name="2">
                        
                    </q-carousel-slide>
                </q-carousel>
                <div class="bottom"></div>
            </div>
            <div class="right">

            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            slide:1
        }
    }
}
</script>

<style lang='scss' scoped>
    #home{
        width: 100%;
        height: 100%;
        position: absolute;
        transition-duration: .5s;
        padding: 15px;
        padding-top: 0;
        z-index: 1;
        box-sizing: border-box;
        .top{
            position: relative;
            height: 60%;
            display: flex;
            flex-direction: row;
            overflow: hidden;
            .left{
                flex: 1;
                display: flex;
                flex-direction: column;
                .carousel{
                    flex: 1;
                    width: 100%;
                    background: blue;
                }
                .bottom{
                    height: 150px;
                    width: 100%;
                    background: pink;
                }
            }
            .right{
                width: 40%;
                height: 100%;
                background: green;
            }
        }
    }
</style>
