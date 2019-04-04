<template>
  <div class="tags-nav">
    <div class="close-con">
      <Dropdown transfer >
        <!-- <Button size="small" type="text"> -->
          <Icon :size="18" type="ios-close-circle-outline" />
        <!-- </Button> -->
        <DropdownMenu slot="list">
          <DropdownItem name="close-all" @click.native="handleCloseWhole('all')">关闭所有</DropdownItem>
          <DropdownItem name="close-others" @click.native="handleCloseWhole()">关闭其他</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div class="btn-con left-btn"  @click="handleScroll(240)">
      <!-- <Button type="text"> -->
        <Icon :size="18" type="ios-arrow-back" />
      <!-- </Button> -->
    </div>
    <div class="btn-con right-btn" @click="handleScroll(-240)">
      <!-- <Button type="text"> -->
        <Icon :size="18" type="ios-arrow-forward" />
      <!-- </Button> -->
    </div>
    <div class="scroll-outer" ref="scrollOuter" >
      <div ref="scrollBody" class="scroll-body" :style="{'left':tagBodyLeft+'px'}" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
        <!-- $router.push('/main') -->
          <Tag type="dot" closable :color="'/home'==path?'primary':'border'"  @click.native="handleBtn('main')">首页</Tag>
          <Tag type="dot" closable :color="item.to==path?'primary':'border'" v-for="item in $store.state.tagMenu" :title="item.title" :key="item.name" @on-close="handleClose(item)" @click.native="handleBtn(item)" >{{item.title}}</Tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      path:'',
       tagBodyLeft: 0,
      rightOffset: 40,
      outerPadding: 4,
    }
  },
  computed:{
    // 获取点击菜单列表数据
    tagMenu(){
      // console.log( this.$store.state.tagMenu)
      // return this.
    },
   
  },
  methods:{
    // tag点击事件
    handleBtn(item){
      if(item=="main"){
         this.$router.push('/home');
      }else{
         this.$router.push(item.to);
      }
      this.$store.commit('menuActive',item.name);
      
    },
     // tag删除事件
     handleClose(item){
        let data={
           title:'',
           isTrue:false
        }
        this.$store.commit("startMenustr");
        if(item.to==this.$route.path){
           this.$router.push('/home');
           data={
              title:item.title,
              isTrue:true
           }
        }else{
            data={
              title:item.title,
              isTrue:false
           }
        }
         this.$store.commit('tagClose',data);
     },
     // tag删除全部或删除除本页外其他事件
    handleCloseWhole(all){
          this.$store.commit('tagCloseWhole',all); 
          this.$store.commit("startMenustr");
           if(all){
            this.$router.push('/home');
           }
     },
     //tag 鼠标滚动事件
     handlescroll (e) {
      var type = e.type
      let delta = 0
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
      }
      this.handleScroll(delta)
        
    },
    //  tag 左右按钮点击事件
    handleScroll (offset) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth //wrap宽
      const bodyWidth = this.$refs.scrollBody.offsetWidth  //content宽
      if (offset > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
      } else {
        if (outerWidth < bodyWidth) {
          if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
            this.tagBodyLeft = this.tagBodyLeft
          } else {
            this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, outerWidth - bodyWidth)
          }
        } else {
          this.tagBodyLeft = 0
        }
      }
    },
  },
  created(){
      this.path= this.$route.path;
      this.$store.commit('path',this.path)
  },
  watch:{
    $route(to, from) {
      this.path= this.$route.path;
      this.$store.commit('path',this.path)
    }
  }
}
</script>


