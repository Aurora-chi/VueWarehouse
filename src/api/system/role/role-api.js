import request from '@/utils/request'

// 获取角色管理表格数据
export function getRoleTableData(data) {
    return request({
        url: '/manage/role/page',
        method: 'post',
        data: data
    })
}

// 角色管理表格列表详情
export function detailsRoleTableData(id) {
    return request({
        url: '/manage/role/get/' + id,
        method: 'post',
        data: {}
    })
}

// 新增角色管理表格列表
export function addRoleTableData(data) {
    return request({
        url: '/manage/role/create',
        method: 'post',
        data: data
    })
}

// 修改角色管理表格列表
export function updateRoleTableData(data) {
    return request({
        url: '/manage/role/update',
        method: 'post',
        data: data
    })
}

// 删除角色管理表格列表
export function delRoleTableData(id) {
    return request({
        url: '/manage/role/del/' + id,
        method: 'post',
        data: {}
    })
}