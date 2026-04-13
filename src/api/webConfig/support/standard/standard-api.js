import request from '@/utils/request'

// 获取表格数据
export function getStandardTableData(data) {
    return request({
        url: '/manage/supportStandard/page',
        method: 'post',
        data: data
    })
}
// 表格数据列表详情
export function detailsStandardTableData(id) {
    return request({
        url: '/manage/supportStandard/get/' + id,
        method: 'post',
        data: {}
    })
}

// 新增表格数据列表
export function addStandardTableData(data) {
    return request({
        url: '/manage/supportStandard/create',
        method: 'post',
        data: data
    })
}

// 修改表格数据列表
export function updateStandardTableData(data) {
    return request({
        url: '/manage/supportStandard/update',
        method: 'post',
        data: data
    })
}

// 删除表格数据列表
export function delStandardTableData(id) {
    return request({
        url: '/manage/supportStandard/del/' + id,
        method: 'post',
        data: {}
    })
}