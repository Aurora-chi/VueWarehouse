import request from '@/utils/request'

// 获取表格数据
export function getCustomerCasesTableData(data) {
    return request({
        url: '/manage/supportCases/page',
        method: 'post',
        data: data
    })
}
// 表格数据列表详情
export function detailsCustomerCasesTableData(id) {
    return request({
        url: '/manage/supportCases/get/' + id,
        method: 'post',
        data: {}
    })
}

// 新增表格数据列表
export function addCustomerCasesTableData(data) {
    return request({
        url: '/manage/supportCases/create',
        method: 'post',
        data: data
    })
}

// 修改表格数据列表
export function updateCustomerCasesTableData(data) {
    return request({
        url: '/manage/supportCases/update',
        method: 'post',
        data: data
    })
}

// 删除表格数据列表
export function delCustomerCasesTableData(id) {
    return request({
        url: '/manage/supportCases/del/' + id,
        method: 'post',
        data: {}
    })
}