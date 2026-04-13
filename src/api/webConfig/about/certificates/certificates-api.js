import request from '@/utils/request'

// 获取表格数据
export function getCertificatesTableData(data) {
    return request({
        url: '/manage/aboutsAptitudes/page',
        method: 'post',
        data: data
    })
}
// 行业数据列表详情
export function detailsCertificatesTableData(id) {
    return request({
        url: '/manage/aboutsAptitudes/get/' + id,
        method: 'post',
        data: {}
    })
}

// 新增表格数据列表
export function addCertificatesTableData(data) {
    return request({
        url: '/manage/aboutsAptitudes/create',
        method: 'post',
        data: data
    })
}

// 修改表格数据列表
export function updateCertificatesTableData(data) {
    return request({
        url: '/manage/aboutsAptitudes/update',
        method: 'post',
        data: data
    })
}

// 删除表格数据列表
export function delCertificatesTableData(id) {
    return request({
        url: '/manage/aboutsAptitudes/del/' + id,
        method: 'post',
        data: {}
    })
}
// 批量删除
export function batchDelCertificatesTableData(data) {
    return request({
        url: '/manage/aboutsAptitudes/batchDel',
        method: 'post',
        data: data
    })
}