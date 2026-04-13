import request from '@/utils/request'

// 获取信息
export function getProfileUserInfo() {
    return request({
        url: '/manage/user/profile/getInfo',
        method: 'post',
        data: {}
    })
}

// 修改信息
export function updateProfileUserInfo(data) {
    return request({
        url: '/manage/user/profile/updateProfile',
        method: 'post',
        data: data
    })
}

// 修改密码
export function updateProfileUserPwd(data) {
    return request({
        url: '/manage/user/profile/updatePwd',
        method: 'post',
        data: data
    })
}