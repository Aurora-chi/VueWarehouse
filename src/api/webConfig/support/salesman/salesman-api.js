import request from '@/utils/request'

// 获取表格数据
export function getSalesmanTableData(data) {
    return request({
        url: '/manage/supportSalesman/page',
        method: 'post',
        data: data
    })
}
// 表格数据列表详情
export function detailsSalesmanTableData(id) {
    return request({
        url: '/manage/supportSalesman/get/' + id,
        method: 'post',
        data: {}
    })
}

// 新增表格数据列表
export function addSalesmanTableData(data) {
    return request({
        url: '/manage/supportSalesman/create',
        method: 'post',
        data: data
    })
}

// 修改表格数据列表
export function updateSalesmanTableData(data) {
    return request({
        url: '/manage/supportSalesman/update',
        method: 'post',
        data: data
    })
}

// 删除表格数据列表
export function delSalesmanTableData(id) {
    return request({
        url: '/manage/supportSalesman/del/' + id,
        method: 'post',
        data: {}
    })
}