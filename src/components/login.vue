<template>
    <div id='login'>
        <div class="header">
            <div>登录</div>
            <q-btn round icon='fas fa-times-circle' flat class="btn" @click="$emit('close')"></q-btn>
        </div>
        <div class="content">
            <q-input v-model='phone'></q-input>
            <q-btn @click="getCode">获取验证码</q-btn>
            <q-input v-model="code"></q-input>
            <q-btn @click="login">登录</q-btn>
        </div>
    </div>
</template>

<script>
import md5 from 'js-md5'
export default {
    data(){
        return{
            phone:'',
            code:''
        }
    },
    methods:{
        getCode(){
            this.$axios({
                method:'get',
                url:'/captcha/sent?phone='+this.phone
            }).then(res=>{
                console.log(res)
            })
        },
        login(){
            this.$axios({
                method:'get',
                url:`/captcha/verify?phone=${this.phone}&captcha=${this.code}`
            }).then(res=>{
                console.log(res)
            })
        }
    }
}
</script>

<style lang='scss' scoped>
    #login{
        width: 500px;
        height: 400px;
        background: rgba($color: #fff, $alpha: 0.6);
        backdrop-filter: blur(20px);
        .header{
            overflow: hidden;
            background: rgba($color: #fff, $alpha: 0.5);
            div{
                font-size: 1.1rem;
                padding: 7px;
                float: left;
                font-weight: bold;
            }
            .btn{
                float: right;
            }
        }
        .content{
            padding: 20px;
        }
    }
</style>