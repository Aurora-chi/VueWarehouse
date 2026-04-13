import request from '@/utils/request'

// 获取表格数据
export function getProductTableData(data) {
    return request({
        url: '/manage/products/page',
        method: 'post',
        data: data
    })
}
// 行业数据列表详情
export function detailsProductTableData(id) {
    return request({
        url: '/manage/products/get/' + id,
        method: 'post',
        data: {}
    })
}

// 新增表格数据列表
export function addProductTableData(data) {
    return request({
        url: '/manage/products/create',
        method: 'post',
        data: data
    })
}

// 修改表格数据列表
export function updateProductTableData(data) {
    return request({
        url: '/manage/products/update',
        method: 'post',
        data: data
    })
}

// 删除表格数据列表
export function delProductTableData(id) {
    return request({
        url: '/manage/products/del/' + id,
        method: 'post',
        data: {}
    })
}

// 删除产品图片
export function delProductImageTableData(id) {
    return request({
        url: '/manage/productImage/del/' + id,
        method: 'post',
        data: {}
    })
}