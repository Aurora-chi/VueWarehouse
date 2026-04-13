import request from '@/utils/request'

// 获取表格数据
export function getInfoTableData(data) {
    return request({
        url: '/manage/company/page',
        method: 'post',
        data: data
    })
}
// 行业数据列表详情
export function detailsInfoTableData(id) {
    return request({
        url: '/manage/company/get/' + id,
        method: 'post',
        data: {}
    })
}

// 新增表格数据列表
export function addInfoTableData(data) {
    return request({
        url: '/manage/company/create',
        method: 'post',
        data: data
    })
}

// 修改表格数据列表
export function updateInfoTableData(data) {
    return request({
        url: '/manage/company/update',
        method: 'post',
        data: data
    })
}

// 删除表格数据列表
export function delInfoTableData(id) {
    return request({
        url: '/manage/company/del/' + id,
        method: 'post',
        data: {}
    })
}