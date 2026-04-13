import request from '@/utils/request'

// 获取表格数据
export function getNavigationTableData(data) {
    return request({
        url: '/manage/navigation/list',
        method: 'post',
        data: data
    })
}
// 行业数据列表详情
export function detailsNavigationTableData(id) {
    return request({
        url: '/manage/navigation/get/' + id,
        method: 'post',
        data: {}
    })
}

// 新增表格数据列表
export function addNavigationTableData(data) {
    return request({
        url: '/manage/navigation/create',
        method: 'post',
        data: data
    })
}

// 修改表格数据列表
export function updateNavigationTableData(data) {
    return request({
        url: '/manage/navigation/update',
        method: 'post',
        data: data
    })
}

// 删除表格数据列表
export function delNavigationTableData(id) {
    return request({
        url: '/manage/navigation/del/' + id,
        method: 'post',
        data: {}
    })
}