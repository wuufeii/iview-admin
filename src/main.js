// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iview from 'iview'
import $ from 'jquery'
import 'iview/dist/styles/iview.css'
import store from './vuex'
import {
		forTreeData
	} from '@/util/util.js'
Vue.use(iview)

import '@/assets/css/index.css'
import '@/assets/css/common.css'
// 引入mockjs
import Mock from '@/mock/mock'
//引入时间格式插件
import dataTime from '@/util/util'
Vue.config.productionTip = false

/*router.beforeEach((to, from, next) => {
	if(to.path!='/'&&to.path!='/home'){
		var menuList = sessionStorage.getItem("menuList");
		if(menuList==null||menuList==''){
			router.push("/");
		}else{
			var menuArray = JSON.parse(menuList);
			var isTrue = false;
			forTreeData(menuArray,function(o){
				if(to.path==o.to){
					isTrue = true;
				}
			});
			if(!isTrue){
				router.push("/");
			}else{
				next();
			}

		}
	}else{
		next();
	}
});*/
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
