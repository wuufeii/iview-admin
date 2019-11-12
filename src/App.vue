<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',

    created() {
      //  获取动态屏高
      window.onresize = () => {
        this.$store.commit('resize', (window.innerHeight - 240))
      }
    }
  }
</script>

<style lang="less">
  @import "./assets/css/index.css";
  @import "./assets/css/changeTheme.less";
  .main .content-wrapper {
    height: calc(100vh - 84px);
  }

</style>
