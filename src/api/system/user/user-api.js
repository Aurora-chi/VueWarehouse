import request from '@/utils/request'

// 获取用户管理表格数据
export function getUserTableData(data) {
    return request({
        url: '/manage/user/page',
        method: 'post',
        data: data
    })
}
// 用户管理表格数据列表详情
export function detailsUserTableData(id) {
    return request({
        url: '/manage/user/get/' + id,
        method: 'post',
        data: {}
    })
}

// 新增用户管理表格数据列表
export function addUserTableData(data) {
    return request({
        url: '/manage/user/create',
        method: 'post',
        data: data
    })
}

// 修改用户管理表格数据列表
export function updateUserTableData(data) {
    return request({
        url: '/manage/user/update',
        method: 'post',
        data: data
    })
}

// 删除用户管理表格数据列表
export function delUserTableData(id) {
    return request({
        url: '/manage/user/del/' + id,
        method: 'post',
        data: {}
    })
}

// 重置用户的密码
export function resetPwdUserTableData(data) {
    return request({
        url: '/manage/user/resetPwd',
        method: 'post',
        data: data
    })
}

// 获取角色列表
export function getRoleListData() {
    return request({
        url: '/manage/role/list',
        method: 'post',
        data: {}
    })
}