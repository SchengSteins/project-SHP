import Vue from 'vue';
import App from './App.vue';
//三级联动组件--全局组件
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination';
import {Button,MessageBox} from 'element-ui';
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
Vue.component(Button.name,Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入路由
import router from '@/router';
//引入仓库
import store from '@/store';
//引入MockServe.js---mock数据(无需暴露，引入执行一次)
import '@/mock/mockServe';
//引入swiper样式
import "swiper/css/swiper.css";

//统一接口API文件夹里面全部请求函数
import * as API from '@/api';

import atm from '@/assets/1.gif';
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload,{
  loading:atm
});

import myPlugins from '@/plugins/myPlugins';
Vue.use(myPlugins,{
    name:'upper'
});

new Vue({
  render: h => h(App),
  //全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //注册路由，组件身上都有$route属性
  router,
  //注册仓库，组件身上会多一个$store属性
  store
}).$mount('#app')
