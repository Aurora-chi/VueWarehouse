import request from '@/utils/request'

// 获取表格数据
export function getHistoryTableData(data) {
    return request({
        url: '/manage/aboutsHistory/page',
        method: 'post',
        data: data
    })
}
// 行业数据列表详情
export function detailsHistoryTableData(id) {
    return request({
        url: '/manage/aboutsHistory/get/' + id,
        method: 'post',
        data: {}
    })
}

// 新增表格数据列表
export function addHistoryTableData(data) {
    return request({
        url: '/manage/aboutsHistory/create',
        method: 'post',
        data: data
    })
}

// 修改表格数据列表
export function updateHistoryTableData(data) {
    return request({
        url: '/manage/aboutsHistory/update',
        method: 'post',
        data: data
    })
}

// 删除表格数据列表
export function delHistoryTableData(id) {
    return request({
        url: '/manage/aboutsHistory/del/' + id,
        method: 'post',
        data: {}
    })
}
// 批量删除
export function batchDelHistoryTableData(data) {
    return request({
        url: '/manage/aboutsHistory/batchDel',
        method: 'post',
        data: data
    })
}