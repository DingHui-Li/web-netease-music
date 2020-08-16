<template>
    <div id='root'>
        <div class="bg">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597381972383&di=6f506faefbf715e46a1c1fc8f66b093d&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2F201611%2F01%2F104320j7yzk7ionk17jk85.jpg" alt="" srcset="">
        </div>
        <div class="container">
            <div class="box">
                <div class="side">
                    <SideMenu />
                </div>
                <div class="content">
                    <Topbar />
                        <scroll-area>
                            <transition enter-active-class="animate__animated animate__slideInDown" leave-active-class="animate__animated animate__slideOutDown">
                                <keep-alive>
                                    <router-view />
                                </keep-alive>
                            </transition>
                        </scroll-area>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'animate.css'
import ScrollArea from '../components/scrollArea'
import SideMenu from '../components/sideMenu'
import Topbar from '../components/topBar'
export default {
    components:{SideMenu,Topbar,ScrollArea}
}
</script>

<style lang='scss' scoped>
    #root{
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        .bg{
            width: 100%;
            height: 100%;
            overflow: hidden;
            transform: scale(1.11);
            z-index: 0;
            position: fixed;
            img{
                left: 0;
                top: 0;
                filter: blur(40px);
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .container{
            position: relative;
            z-index: 1;
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .box{
                // max-width: 1200px;
                // max-height: 800px;
                height: 100%;
                width: 100%;
                position: relative;
                background: transparent;
                display: flex;
                flex-direction: row;
                //border-radius: 10px;
                overflow: hidden;
                .side{
                    width: 250px;
                    min-width: 200px;
                    position: relative;
                }
                .content{
                    flex: 1;
                    position: relative;
                    background: #fff;
                    min-width: 900px;
                    height: 100%;
                }
            }
        }
    }
</style>
