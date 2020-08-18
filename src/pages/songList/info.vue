<template>
    <vue-aspect-ratio ar='16:9' width="100%" style="max-width:800px">
        <div class="cover">
            <!-- <img :src="detil.picUrl||detil.coverImgUrl" class="animate__animated animate__fadeIn" alt="" srcset=""> -->
            <q-img :src="(detil.picUrl||detil.coverImgUrl)+'?param=1920y1080'" transition="jump-down"></q-img>
            <div class="bg">
                <div class="name">{{detil.name}}</div>
                <div class="desc">
                    <pre>{{detil.description}}</pre>
                </div>
                <div class="tags">
                    <q-chip v-for="tag in detil.tags" :key="tag" class="tag">{{tag}}</q-chip>
                </div>
                <div class="actions">
                    <div v-if='detil.creator' class="user">
                        <q-btn class="user-btn" round>
                            <img :src="detil.creator.avatarUrl+'?param=50y50'" alt="" srcset="">
                            <q-popup-proxy>
                                <UserCard :data='detil.creator'/>
                            </q-popup-proxy>
                        </q-btn>
                        <div>
                            <div class="name">{{detil.creator.remarkName||detil.creator.nickname}}</div>
                            <div class="time">{{new Date(detil.updateTime).toLocaleString()}}</div>
                        </div>
                    </div>
                    <div>
                        <q-btn color="primary" rounded class="btn">
                            <q-icon class="fas fa-play" size="xs"></q-icon>
                            <span>共 {{detil.trackCount}} 首</span>
                        </q-btn>
                        <q-btn round color="primary" icon='fas fa-heart' style="margin-left:15px"></q-btn>
                    </div>
                </div>
            </div>
        </div>
    </vue-aspect-ratio>
</template>

<script>
import VueAspectRatio from 'vue-aspect-ratio'
import UserCard from '../../components/user-card'
export default {
    props:['detil'],
    components:{VueAspectRatio,UserCard},
}
</script>

<style lang='scss' scoped>
.cover{
    height: 100%;
    overflow: hidden;
    border-radius: 10px;
    position: relative;
    background: $primary;
    user-select: none;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .bg{
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom,rgba(#000,1),rgba(#000,0));
        padding: 30px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        .name{
            font-size: 1.5rem;
            font-weight: bold;
            color: rgba($color: #fff, $alpha: 0.9);
        }
        .desc{
            font-size: 1rem;
            color: rgba($color: #fff, $alpha: 0.8);
            max-height: 100px;
            overflow: hidden;
            cursor: pointer;
            transition: all .5s;
            &:hover{
                color: rgba($color: #fff, $alpha: 0.6);
            }
            pre{
                white-space: pre-wrap;
            }
        }
        .tags{
            margin-top: 10px;
            .tag{
                background: rgba(#fff, $alpha: 0.3);
                color: #000;
                backdrop-filter: blur(5px);
                cursor: pointer;
                &:hover{
                    filter: brightness(85%);
                }
            }
        }
        .actions{
            position: absolute;
            width: calc(100% - 30px);
            bottom: 15px;
            right: 15px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            .user{
                overflow: hidden;
                display: flex;
                align-items: center;
                padding-right:15px;
                background: rgba($color: #fff, $alpha: 0.3);
                border-radius: 30px;
                backdrop-filter: blur(5px);
                .name{
                    font-size: 0.9px;
                    color: #000;
                }
                .time{
                    font-size: 0.7rem;
                }
                .user-btn{
                    overflow: hidden;
                    margin-right: 5px;
                    img{
                        width: 42px;
                        height: 42px;
                        object-fit: cover;
                    }
                }
            }
            .btn{
                padding: 0 5px;
                span{
                    margin-left: 10px;
                }
            }
        }
    }
}
</style>