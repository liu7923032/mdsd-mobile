import Vue from 'vue'

import Router from 'vue-router'
//配置路由规则
import routerMap from './routers'

import FastClick from 'fastclick'

//加载数据请求组件
import VueResource from 'vue-resource'

import auth from './views/utils/auth.js'
//
import App from './App.vue'

import filters from './filters/filters';




// 1:创建启动的版本

Vue.use(Router)
Vue.use(VueResource)

// 初始化过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

// 1:设置访问的地址
// Vue.http.options.root = 'http://e.mdsd.cn:9000/api';
Vue.http.options.root = 'http://localhost:9001/api';
// 2:设置拦截器
// Vue.http.interceptors.push((request, next) => {
//     console.log(Vue);
//     this.$root.loading = { show: true, text: '加载中...' };
//     //在每次请求之前都加上人员的验证
//     request.headers["Authorization"] = "BasicAuth " + auth.getTicket();
//     next((response) => {
//         this.$root.loading = { show: false, text: '' };
//         // 1：如果返回失败,那么就返回错误代码
//         if (!response.ok) {
//             this.$root.dialog={type:'cancel',text:"错误代码:"+response.status}
//         }
//         // 2：如果请求成功，那么久检查是否存在json结果
//         return response
//     });
// });



// 创建一个路由器实例
// 创建实例时可以传入配置参数进行定制，为保持简单，这里使用默认配置


// 定义路由规则
// 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend
// 创建的组件构造函数，也可以是一个组件选项对象。
// 稍后我们会讲解嵌套路由
//注册路由
var router = new Router({
    history: true,
    saveScrollPosition: true
});
routerMap(router);

//消除click延迟
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}


//权限检查
router.beforeEach(transition => {
    //处理左侧滚动不影响右边
    // $("html, body, #page").removeClass("scroll-hide");
    if (transition.to.auth) {
        if (auth.isLogin()) {
            transition.next();
        } else {
            var redirect = encodeURIComponent(transition.to.path);
            transition.redirect('/login?redirect=' + redirect);
        }
    } else {
        transition.next();
    }
});


// // 发送请求和返回的拦截器
Vue.http.interceptors.push(function () {
    return {
        request: function (request) {

            this.$root.loading = { show: true, text: '加载中...' };
            //在每次请求之前都加上人员的验证
            request.headers["Authorization"] = "BasicAuth " + auth.getTicket();
            return request;
        },
        response: function (response) {
            //1:取消进度条显示
            this.$root.loading = { show: false, text: '' }
            //对返回的结果提前检查
            if (response.status == 401) {
                router.redirect('/login');
            } else if (response.status == 0) {
                this.$root.toast = { show: false, type: 'cancel', text: '网络连接失败' }
                // console.log("网络连接失败");
            }
            return response;
        }

    };
});






// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(App, '#app')

