import request from '@/utils/request'

// 获取表格数据
export function getProjectTableData(data) {
    return request({
        url: '/manage/project/page',
        method: 'post',
        data: data
    })
}
// 行业数据列表详情
export function detailsProjectTableData(id) {
    return request({
        url: '/manage/project/get/' + id,
        method: 'post',
        data: {}
    })
}

// 新增表格数据列表
export function addProjectTableData(data) {
    return request({
        url: '/manage/project/create',
        method: 'post',
        data: data
    })
}

// 修改表格数据列表
export function updateProjectTableData(data) {
    return request({
        url: '/manage/project/update',
        method: 'post',
        data: data
    })
}

// 删除表格数据列表
export function delProjectTableData(id) {
    return request({
        url: '/manage/project/del/' + id,
        method: 'post',
        data: {}
    })
}