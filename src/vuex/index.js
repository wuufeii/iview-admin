// vuex
import Vue from 'vue'
import Vuex from 'vuex'
import {ajaxReq} from '@/util/axios.js'

Vue.use(Vuex)


const state = {
    tagMenu:[],
    path:'',
    activeName:'',
    clientHeight:(window.innerHeight-240),
    title: (document.title)
};
const getters ={

}
const mutations = {
    // onresize事件
    resize(state,val){
      state.clientHeight=val
    },
    // 获取侧导航选中状态
    menuActive(state,val){
       state.activeName=val
    }, 
    // 刷新后初始tag栏 
    startMenustr(state){
        let val='';
        state.tagMenu.forEach(item => {
            val=val+item.to
        });
       
        sessionStorage.setItem('push',val)
    },
    //获取初始数据
    startMenuArr(state,data){
        state.tagMenu=data;
    },
    // 左侧菜单点击事件传递
    getMenu(state,data){
        let offon=true;
        state.tagMenu.forEach(item => {
            if(item.title==data.title){
                offon=false
            }
        });
        if(offon){
            state.tagMenu.push(data)
        }
    },
    // 获取路由path改变的值
    path(state,val){
        state.path=val
    },
     // 顶部tag栏删除事件传递
    tagClose(state,data){
        console.log(data)
        if(data.isTrue){
            state.activeName=''    
        }
        state.tagMenu.forEach((item,index) => { 
            if(item.title==data.title){
                state.tagMenu.splice(index,1)
            }
        });
    },
    // tag删除全部或删除除本页外其他事件传递
    tagCloseWhole(state,all){
        console.log(this.$route)
        if(all=="all"){
            state.tagMenu=[];    
            state.activeName=''   
            
        }else{
            state.tagMenu.forEach((item,index) => {
                if(item.to==state.path){
                    state.tagMenu=[item]   
                }
            });
        }
    }
};


const actions = {
   
};


export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions

})