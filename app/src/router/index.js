//配置路由的地方
import Vue from "vue";
import VueRouter from 'vue-router';
import routes from './routes'
//使用插件
Vue.use(VueRouter);
//引入store
import store from '@/store'

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}

//配置路由
let router = new VueRouter({
    // 配置路由
    routes,
    scrollBehavior(to, from, savedPosition) {
        //滚动条位子，在最上方
        return { y: 0 };
    }
});

//全局守卫：全局守卫（在路由跳转之间进行判断）
router.beforeEach(async (to, from, next) => {
    //to:可以获取到你要跳转到哪个路由信息
    //from:可以获取到你从哪个路由而来的信息
    //next:放行函数 next()放行  
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    if (token) {
        //用户已经登录，无法进入登录页面
        if (to.path == '/login') {
            next('/home');
        } else {
            //登录成功，去的是其它页面
            if (name) {
                next();
            } else {
                //没有用户信息，派发action让仓库存储用户信息再跳转
                try {
                    //获取用户信息
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    //token失效了
                    //清除token
                    store.dispatch('userLogout');
                    next('/login');
                }
            }
        }
    } else {
        //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
        //未登录去上面这些路由-----登录
        let toPath = to.path;
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
            next('/login?redirect=' + toPath);
        } else {
            //去的不是上面这些路由（home|search|shopCart）---放行
            next();
        }
    }
});

export default router;