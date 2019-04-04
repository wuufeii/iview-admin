<template>
  <Layout style="hieght:100vh" class="main">
    <Header>
       <nav-header @collapsedSider="collapsedSider"></nav-header>
    </Header>
    <Layout>
      <Sider ref="side1" width="240" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" >
          <!-- 菜单导航 -->
         <slide-menu :slideShow="slideShow"></slide-menu>
      </Sider>
      <Content>
           <tags-nav></tags-nav>
           <div class="content-wrapper">
             <keep-alive>
                   <router-view/>
             </keep-alive>
           </div>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import slideMenu from './common/slide-menu'
import navHeader from './common/nav-header'
import tagsNav from './common/tags-nav'
export default {
  data() {
    return {
      isCollapsed: false,
      slideShow:true
    };
  },
  components:{
      slideMenu,navHeader,tagsNav
  },
  
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
      this.slideShow=!this.slideShow
    }
  }
};
</script>

<style scoped>
.menu-icon {
  transition: all 0.5s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
/* .menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
} */
</style>


