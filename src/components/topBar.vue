<template>
    <div id='top-bar'>
        <q-input borderless outlined class="input" dense rounded>
            <template v-slot:prepend>
                <q-icon name="fas fa-search"/>
            </template>
        </q-input>
        <div class="user-info">
            <q-avatar size="45px">
                <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3452544685,1844225866&fm=26&gp=0.jpg">
            </q-avatar>
            <div>
                <div class="name">Name</div>
                <q-btn-dropdown label="帐号" size='sm' flat content-class='pop-menu'>
                    <q-list>
                        <q-item clickable>
                            <q-item-section>
                                <q-item-label>退出登录</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-btn-dropdown>
            </div>
            <q-btn round icon="fas fa-bell" flat color='primary'>
                <q-badge color="red" floating>4</q-badge>
            </q-btn>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
    #top-bar{
        padding: 15px 30px;
        position: relative;
        z-index: 2;
        background: #fff;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        .input{
            width: 200px;
        }
        .user-info{
            display: flex;
            flex-direction: row;
            align-items: center;
            .name{
                margin-left: 15px;
                font-weight: bold;
            }
            .pop-menu{
                background: red;
            }
        }
    }
</style>