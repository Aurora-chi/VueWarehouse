import request from '@/utils/request'

// 获取表格数据
export function getMessageTableData(data) {
    return request({
        url: '/manage/message/page',
        method: 'post',
        data: data
    })
}
// 行业数据列表详情
export function detailsMessageTableData(id) {
    return request({
        url: '/manage/message/get/{' + id + '}',
        method: 'post',
        data: {}
    })
}


// 删除表格数据列表
export function delMessageTableData(id) {
    return request({
        url: '/manage/message/del/' + id,
        method: 'post',
        data: {}
    })
}
