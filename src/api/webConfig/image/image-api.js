import request from '@/utils/request'

// 获取表格数据
export function getImageTableData(data) {
    return request({
        url: '/manage/navigation/image/page',
        method: 'post',
        data: data
    })
}
// 行业数据列表详情
export function detailsImageTableData(id) {
    return request({
        url: '/manage/navigation/image/get/' + id,
        method: 'post',
        data: {}
    })
}

// 新增表格数据列表
export function addImageTableData(data) {
    return request({
        url: '/manage/navigation/image/create',
        method: 'post',
        data: data
    })
}

// 修改表格数据列表
export function updateImageTableData(data) {
    return request({
        url: '/manage/navigation/image/update',
        method: 'post',
        data: data
    })
}

// 删除表格数据列表
export function delImageTableData(id) {
    return request({
        url: '/manage/navigation/image/del/' + id,
        method: 'post',
        data: {}
    })
}