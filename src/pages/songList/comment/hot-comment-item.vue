<template>
    <div class="hot-comment-item">
        <img class="avatar" :src="data.user.avatarUrl+'?param=500y500'" alt="">
        <div class="content-box">
            <span class="mark top-mark">“</span>
            <span class="mark bottom-mark">”</span>
            <div class="content">{{data.content}}</div>
            <div class="name">{{data.user.nickname}}</div>
            <div class="time">{{new Date(data.time).toLocaleString()}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props:['data']
}
</script>

<style lang='scss' scoped>
    .hot-comment-item{
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: row;
        box-shadow: 1px 1px 5px 0px rgba($color: #000000, $alpha: 0.1);
        margin-bottom: 20px;
        height: 200px;
        .avatar{
            width: 200px;
            height: 200px;
            object-fit: cover;
        }
        .content-box{
            flex: 1;
            position: relative;
            display: flex;
            overflow: hidden;
            flex-direction: column;
            justify-content: center;
            padding:35px;
            .content{
                font-size: 1rem;
                font-weight: bold;
                color: rgba($color: #000000, $alpha: 0.7);
                text-overflow: ellipsis;
            }
            .name{
                text-align: right;
                margin-top: 15px;
                font-weight: bold;
                color: rgba($color: #000000, $alpha: 0.7);
            }
            .time{
                text-align: right;
                color: grey;
                font-size: 0.8rem;
            }
            .mark{
                position: absolute;
                font-size: 7rem;
                color: rgba($primary, $alpha: 0.5);
                font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            }
            .top-mark{
                top: -50px; 
                left:15px
            }
            .bottom-mark{
                bottom: -90px; 
                right:15px
            }
        }
    }
</style>