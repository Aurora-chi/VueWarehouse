import request from '@/utils/request'

// 修改表格数据列表
export function updateMetadataTableData(data) {
    return request({
        url: '/manage/metadata/create',
        method: 'post',
        data: data
    })
}

// 行业数据列表详情
export function detailsMetadataTableData() {
    return request({
        url: '/manage/metadata/get',
        method: 'post',
        data: {}
    })
}