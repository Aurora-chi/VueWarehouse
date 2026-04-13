import request from '@/utils/request'

// 获取表格数据
export function getFaqTableData(data) {
    return request({
        url: '/manage/supportFaq/page',
        method: 'post',
        data: data
    })
}
// 行业数据列表详情
export function detailsFaqTableData(id) {
    return request({
        url: '/manage/supportFaq/get/' + id,
        method: 'post',
        data: {}
    })
}

// 新增表格数据列表
export function addFaqTableData(data) {
    return request({
        url: '/manage/supportFaq/create',
        method: 'post',
        data: data
    })
}

// 修改表格数据列表
export function updateFaqTableData(data) {
    return request({
        url: '/manage/supportFaq/update',
        method: 'post',
        data: data
    })
}

// 删除表格数据列表
export function delFaqTableData(id) {
    return request({
        url: '/manage/supportFaq/del/' + id,
        method: 'post',
        data: {}
    })
}