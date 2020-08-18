<template>
    <div class="comment">
        <div class="title" v-show="hotComments.length>0">热门评论</div>
        <HotCommentItem v-for="comment in hotComments.slice(0,3)" :key="comment.commentId" :data='comment'/>
        <div class="title">最新评论</div>
        <CommentItem v-for="comment in comments" :key="comment.commentId" :data='comment'/>
    </div>
</template>

<script>
import HotCommentItem from './hot-comment-item'
import CommentItem from './comment-item'
export default {
    components:{HotCommentItem,CommentItem},
    props:['id'],
    data(){
        return{
            hotComments:[],
            comments:[],
            commentIds:{},//用于向comments数组里添加时判断和添加的位置
        }
    },
    created(){
        this.getComment()
    },
    watch:{
        id(v){
            this.hotComments=[]
            this.comments=[]
            this.commentIds={}
            this.getComment()
        }
    },
    methods:{
        getComment(){
            this.$axios({
                method:'get',
                url:`/comment/playlist?id=${this.id}&limit=100`
            }).then(res=>{
                if(res.data.code==200){
                    this.hotComments=res.data.hotComments
                    for(let comment of res.data.comments){
                        let temp=comment;
                        let pid=comment.parentCommentId
                        //delete temp['beReplied']
                        if(pid==0){//父id为0，说明是评论
                            let id=comment.commentId
                            if(this.commentIds[id]){
                                this.comments[this.commentIds[id]-1]['content']=temp
                            }else{
                                this.commentIds[id]=Object.keys(this.commentIds).length+1//commentIds的长度就是该条评论在comments中的位置下标,+1是为了避免取0
                                this.comments.push({content:temp,reply:[]})
                            }
                        }else{//反之为回复
                            if(this.commentIds[pid]){
                                this.comments[this.commentIds[pid]-1]['reply'].unshift(temp)
                            }else{
                                this.commentIds[pid]=Object.keys(this.commentIds).length+1//同上
                                this.comments.push({reply:[temp]})
                            }
                        }
                    }
                }
            })
        },
    }
}
</script>

<style lang='scss' scoped>
    .comment{
        padding:15px;
        .title{
            font-size: 1.3rem;
            font-weight: bold;
            color: rgba($color: #000000, $alpha: 0.7);
            margin-bottom: 15px;
        }
    }
</style>