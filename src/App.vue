<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
  .pop-menu{
    background: rgba($color: #fff, $alpha: 0.7);
    position: relative;
    &::after{
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      filter: blur(20px);
      
    }
  }
</style>
