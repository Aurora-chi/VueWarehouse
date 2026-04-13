import request from '@/utils/request'

// 获取菜单管理表格数据
export function getMenuTableData() {
    return request({
        url: '/manage/menu/list',
        method: 'post',
        data: {}
    })
}

// 详情菜单管理列表数据
export function detailsMenuTableData(id) {
    return request({
        url: '/manage/menu/get/' + id,
        method: 'post',
        data: {}
    })
}

// 新增菜单管理列表数据
export function addMenuTableData(data) {
    return request({
        url: '/manage/menu/create',
        method: 'post',
        data: data
    })
}

// 修改菜单管理列表数据
export function updateMenuTableData(data) {
    return request({
        url: '/manage/menu/update',
        method: 'post',
        data: data
    })
}

// 删除菜单管理列表数据
export function delMenuTableData(id) {
    return request({
        url: '/manage/menu/del/' + id,
        method: 'post',
        data: {}
    })
}