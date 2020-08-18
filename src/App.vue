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
*{
  scroll-behavior: smooth;
  padding:0;
  margin:0;
}
body{
  overflow: auto;
  overflow-x: hidden;
}
  .pop-menu,.q-menu{
    position: relative;
    background: rgba($color: #fff, $alpha: 0.7);
    backdrop-filter: blur(10px);
  }
</style>
