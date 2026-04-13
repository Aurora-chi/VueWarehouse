import request from '@/utils/request'

// 获取表格数据
export function getProfileTableData(data) {
    return request({
        url: '/manage/aboutsSynopsis/page',
        method: 'post',
        data: data
    })
}
// 行业数据列表详情
export function detailsProfileTableData(id) {
    return request({
        url: '/manage/aboutsSynopsis/get/' + id,
        method: 'post',
        data: {}
    })
}

// 新增表格数据列表
export function addProfileTableData(data) {
    return request({
        url: '/manage/aboutsSynopsis/create',
        method: 'post',
        data: data
    })
}

// 修改表格数据列表
export function updateProfileTableData(data) {
    return request({
        url: '/manage/aboutsSynopsis/update',
        method: 'post',
        data: data
    })
}

// 删除表格数据列表
export function delProfileTableData(id) {
    return request({
        url: '/manage/aboutsSynopsis/del/' + id,
        method: 'post',
        data: {}
    })
}
// 批量删除
export function batchDelProfileTableData(data) {
    return request({
        url: '/manage/aboutsSynopsis/batchDel',
        method: 'post',
        data: data
    })
}