import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import Cookies from 'js-cookie'
import router from '@/router'  // 导入 router 实例

const url = "192.168.0.114:9012"

// 创建 axios 实例
const service = axios.create({
    baseURL: `http://${url}`, // 从环境变量读取基础URL
    timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 从 cookie 获取 token
        const token = Cookies.get("Admin-Token")
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
        }
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data

        // 根据你的后端返回格式调整
        if (res.code !== 200) {
            Message({
                message: res.msg || '请求失败',
                type: 'error',
                duration: 5 * 1000
            })

            // 401: 未登录或 token 过期
            if (res.code === 1001) {
                MessageBox.confirm('登录状态已过期，请重新登录', '系统提示', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 清除本地登录信息
                    Cookies.remove('Admin-Token')
                    router.push('/login')
                })
            }
            return Promise.reject(new Error(res.msg || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error)
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service