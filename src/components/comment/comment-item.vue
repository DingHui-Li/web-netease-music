<template>
    <div class="comment-item">
        <div class="left">
            <q-avatar :size="isReply?'30px':'40px'">
                <img :src="content.user.avatarUrl+'?param=50y50'" alt="" srcset="">
            </q-avatar>
        </div>
        <div class="right" :style="`border-bottom-width:${isReply?'0':'1'};`">
            <div class="name" :style="`line-height:${isReply?'30px':'40px'}`">{{content.user.nickname}}</div>
            <div class="content">{{content.content}}</div>
            <div class="time">{{new Date(content.time).toLocaleString()}}</div>
            <CommentItem v-for="re in reply" :key="re.commentId" :data='re' :isReply='true'/>
        </div>
    </div>
</template>

<script>
export default {
    name:'CommentItem',
    props:['data','isReply'],
    computed:{
        content(){
            if(this.isReply) return this.data
            if(this.data.content) return this.data.content
            if(this.data.reply.length>0){
                return this.data.reply[this.data.reply.length-1].beReplied[0]
            }
        },
        reply(){
            return this.data.reply
        }
    }
}
</script>

<style lang='scss' scoped>
    .comment-item{
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
        .left{
            width: 40px;
        }
        .right{
            flex: 1;
            padding-left: 5px;
            border-bottom:1px solid rgba($color: #000000, $alpha: 0.06);
            .name{
                font-weight: bold;
                line-height: 40px;
            }
            .content{
                margin-bottom: 10px;
            }
            .time{
                font-size: 0.7rem;
                color: grey;
                margin-bottom: 10px;
            }
        }
    }
</style>