import request from '@/utils/request'

// 获取表格数据
export function getCustomerServiceTableData() {
    return request({
        url: '/manage/supportCustomer/get',
        method: 'post',
        data: {}
    })
}

// 修改表格数据列表
export function updateCustomerServiceTableData(data) {
    return request({
        url: '/manage/supportCustomer/create',
        method: 'post',
        data: data
    })
}

