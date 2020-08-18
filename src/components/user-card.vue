<template>
    <div class="user-card">
        <ScrollArea>
        <q-img class="cover" :src="data.backgroundUrl+'?param=500y500'" transition="jump-down" />
        <div class="info">
            <div class="top">
                <q-avatar size="50px">
                    <img :src='data.avatarUrl+"?param=50y50"' class="avatar"/>
                </q-avatar>
                <div class="name">{{data.nickname}} 
                    <q-icon class="fas fa-venus" color="pink" v-if='data.gender==2'></q-icon>
                    <q-icon class="fas fa-mars-stroke" color="blue" v-else></q-icon>
                </div>
            </div>
            <div class="sign">{{data.signature}}</div>
            <div class="tags">
                <q-chip v-for="tag in data.expertTags" :key="tag" class="tag">{{tag}}</q-chip>
            </div>
        </div>
        </ScrollArea>
    </div>
</template>

<script>
import ScrollArea from './scrollArea'
export default {
    props:['data'],
    components:{ScrollArea},
    mounted(){
        console.log(this.data)
    }
}
</script>

<style lang='scss' scoped>
    .user-card{
        width: 400px;
        height: 300px;
        background: transparent;
        .cover{
            height: 150px;
            object-fit: cover;
        }
        .info{
            position: relative;
            padding: 15px;
            padding-top: 35px;
            .top{
                position: absolute;
                //transform: translateY(-25px);
                top:-25px;
                display: flex;
                flex-direction: row;
                align-items: flex-end;
                .name{
                    font-weight: bold;
                    margin-left: 5px;
                }
            }
            .tags{
                margin-top: 10px;
                .tag{
                    background: rgba($primary, $alpha: 0.5);
                    color: #fff;
                    backdrop-filter: blur(5px);
                    cursor: pointer;
                    &:hover{
                        filter: brightness(85%);
                    }
                }
            }
        }
    }
</style>