//路由配置信息
import Home from '@/views/Home'
import Search from '@/views/Search'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Detail from '@/views/Detail'
import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart'
import Trade from '@/views/Trade'
import Pay from '@/views/Pay'
import PaySuccess from '@/views/PaySuccess'
import Center from '@/views/Center'
//引入二级路由
import MyOrder from '@/views/Center/myOrder'
import GroupOrder from '@/views/Center/groupOrder'
export default [
    {
        path: "/home",
        component: Home,
        meta: {
            show: true
        }
    },
    {
        path: "/search/:keyword?", //指定params参数可传可不传 
        component: Search,
        meta: {
            show: true
        },
        name: "search"
    },
    {
        path: "/login",
        component: Login,
        meta: {
            show: false
        }
    },
    {
        path: "/register",
        component: Register,
        meta: {
            show: false
        }
    },
    //重定向
    {
        path: '*',
        redirect: '/home'
    },
    {
        path: "/detail/:skuid",
        component: Detail,
        meta: {
            show: true
        }
    },
    {
        path: "/addcartsuccess",
        name: 'addcartsuccess',
        component: AddCartSuccess,
        meta: {
            show: true
        }
    },
    {
        path: "/shopcart",
        component: ShopCart,
        meta: {
            show: true
        }
    },
    {
        path: "/trade",
        component: Trade,
        meta: {
            show: true
        },
        beforeEnter(to, from, next) {
            if (from.path === '/shopcart') {
                next()
            } else {
                next('/shopcart')
            }
        }
    },
    {
        path: "/pay",
        component: Pay,
        meta: {
            show: true
        },
        beforeEnter (to, from, next) {
            if (from.path==='/trade') {
              next()
            } else {
              next('/trade')
            }
          }
    },
    {
        path: "/paysuccess",
        component: PaySuccess,
        meta: {
            show: true
        }
    },
    {
        path: "/center",
        component: Center,
        meta: {
            show: true
        },
        //二级路由
        children: [
            {
                path: 'myorder',
                component: MyOrder,

            },
            {
                path: 'grouporder',
                component: GroupOrder,
            },
        ]
    },
]