// 引入axios依赖
import axios from 'axios'
// 引入element-ui依赖
import Element from 'element-ui'
// 引入VueX
import store from '../store'
// 引入路由
import router from '../router'

const http = axios.create({
    baseURL: 'http://localhost:8081/',
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})

http.interceptors.request.use(
    config => {
        return config
    }, error => {
        console.log(error)
        return Promise.reject(error)
    })

http.interceptors.response.use(response => {
    let res = response.data
    console.log(response);
    console.log(res);
    if (res.code == 200) {
        return response
    } else {
        Element.Message.error('操作错了哦', {
            duration: 2 * 1000
        })
        //返回一个异常提示就不会继续往下走了 不+的话 res=>的里面 还是会继续走的
        return Promise.reject(response.data.msg)
    }
    // 捕获并处理后台异常信息
}, error => {
    console.log(error);
    if (error.response.data) {
        error.message = error.response.data.msg
        console.log('==========================');
        console.log(error.message);
        console.log('==========================');
    }
    if (error.response.status == 401) {
        store.commit('REMOVE_INFO') // 清空token userinfo
        router.push('/login') // 跳转到登录界面
    }
    Element.Message.error(error.message)

    return Promise.reject(error)
})

export default http