import request from '@/utils/request'

// 获取表格数据
export function getNewsTableData(data) {
    return request({
        url: '/manage/journalism/page',
        method: 'post',
        data: data
    })
}
// 行业数据列表详情
export function detailsNewsTableData(id) {
    return request({
        url: '/manage/journalism/get/' + id,
        method: 'post',
        data: {}
    })
}

// 新增表格数据列表
export function addNewsTableData(data) {
    return request({
        url: '/manage/journalism/create',
        method: 'post',
        data: data
    })
}

// 修改表格数据列表
export function updateNewsTableData(data) {
    return request({
        url: '/manage/journalism/update',
        method: 'post',
        data: data
    })
}

// 删除表格数据列表
export function delNewsTableData(id) {
    return request({
        url: '/manage/journalism/del/' + id,
        method: 'post',
        data: {}
    })
}
// 批量删除
export function batchDelNewsTableData(id) {
    return request({
        url: '/manage/journalism/del/' + id,
        method: 'post',
        data: {}
    })
}