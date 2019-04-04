<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',

  created(){
  	this.$Message.config({
  		top:100,
		  duration: 1.5
    });
    //  获取动态屏高
    window.onresize=()=>{
       this.$store.commit('resize',(window.innerHeight-240)) 
    }
  }
}
</script>

<style lang="less">
    .main .content-wrapper {
    height: calc(100vh - 84px);
    }

</style>
