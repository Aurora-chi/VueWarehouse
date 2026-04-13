import request from '@/utils/request'

// 获取日志表格数据
export function getLogTableData(data) {
    return request({
        url: '/manage/operateLog/page',
        method: 'post',
        data: data
    })
}

// 获取日志表格列表详情
export function detailsLogTableData(id) {
    return request({
        url: '/manage/operateLog/get/' + id,
        method: 'post',
        data: {}
    })
}