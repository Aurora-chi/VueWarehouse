import request from '@/utils/request'

// 获取验证码图片
export function getCodeImg() {
    return request({
        url: '/manage/captcha/getCaptchaCode',
        method: 'get'
    })
}

// 获取密钥数据（用于密码加密）
export function getKeyData() {
    return request({
        url: '/manage/auth/getKey',
        method: 'post'
    })
}

// 登录接口
export function login(data) {
    return request({
        url: '/manage/auth/login',
        method: 'post',
        data: data
    })
}

// 获取用户信息
export function getInfo() {
    return request({
        url: '/manage/user/profile/getInfo',
        method: 'post'
    })
}

// 退出登录
export function logout() {
    return request({
        url: '/manage/logout',
        method: 'post'
    })
}

// 获取路由信息

export function getRouters() {
    return request({
        url: '/manage/menu/getRouters',
        method: 'post'
    })
}