import request from '@/utils/request'

// 获取字典表格数据
export function getDictTableData(data) {
    return request({
        url: '/manage/dictType/page',
        method: 'post',
        data: data
    })
}

// 获取字典表格列表详情
export function detailsDictTableData(id) {
    return request({
        url: '/manage/dictType/get/' + id,
        method: 'post',
        data: {}
    })
}

// 新增字典表格列表
export function addDictTableData(data) {
    return request({
        url: '/manage/dictType/create',
        method: 'post',
        data: data
    })
}

// 更新字典表格列表
export function updateDictTableData(data) {
    return request({
        url: '/manage/dictType/update',
        method: 'post',
        data: data
    })
}

// 删除字典表格列表
export function delDictTableData(id) {
    return request({
        url: '/manage/dictType/del/' + id,
        method: 'post',
        data: {}
    })
}