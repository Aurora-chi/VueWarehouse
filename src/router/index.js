import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/login/index.vue"
import UserMain from "../views/main/index.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    redirect: "/login"
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test.vue')
  },
  {
    path: "/main",
    name: "首页",
    component: UserMain,
    children: [
      {
        path: "/system", component: () => import('@/views/system/index.vue'), name: "系统管理", children: [
          { path: "/system/menu", name: "菜单管理", component: () => import('@/views/system/menu/index.vue') },
          { path: "/system/log", name: "日志管理", component: () => import('@/views/system/log/index.vue') },
          { path: "/system/dict", name: "字典管理", component: () => import('@/views/system/dict/index.vue') },
          { path: "/system/role", name: "角色管理", component: () => import('@/views/system/role/index.vue') },
          { path: "/system/user", name: "用户管理", component: () => import('@/views/system/user/index.vue') },
        ]
      },
      {
        path: "/webConfig", name: "网站配置", component: () => import('@/views/webConfig/index.vue'), children: [
          {
            path: "/webConfig/support", name: "服务与支持", component: () => import('@/views/webConfig/support/index.vue'), children: [
              { path: "/webConfig/support/standard", name: "行业标准", component: () => import('@/views/webConfig/support/standard/index.vue') },
              { path: "/webConfig/support/customerCases", name: "客户案例", component: () => import('@/views/webConfig/support/customerCases/index.vue') },
              { path: "/webConfig/support/customerService", name: "客户服务", component: () => import('@/views/webConfig/support/customerService/index.vue') },
              { path: "/webConfig/support/faq", name: "常见问题", component: () => import('@/views/webConfig/support/faq/index.vue') },
              { path: "/webConfig/support/salesman", name: "销售人员", component: () => import('@/views/webConfig/support/salesman/index.vue') },]
          },
          { path: "/webConfig/news", name: "新闻动态", component: () => import('@/views/webConfig/news/index.vue') },
          { path: "/webConfig/project", name: "项目中心", component: () => import('@/views/webConfig/project/index.vue') },
          { path: "/webConfig/product", name: "产品管理", component: () => import('@/views/webConfig/product/index.vue') },
          {
            path: "/webConfig/about", name: "关于我们", component: () => import('@/views/webConfig/about/index.vue'), children: [
              { path: "/webConfig/about/info", name: "公司信息", component: () => import('@/views/webConfig/about/info/index.vue') },
              { path: "/webConfig/about/profile", name: "公司简介", component: () => import('@/views/webConfig/about/profile/index.vue') },
              { path: "/webConfig/about/certificates", name: "荣誉资质", component: () => import('@/views/webConfig/about/certificates/index.vue') },
              { path: "/webConfig/about/history", name: "发展历史", component: () => import('@/views/webConfig/about/history/index.vue') },
            ]
          },
          { path: "/webConfig/metadata", name: "元数据配置", component: () => import('@/views/webConfig/metadata/index.vue') },
          { path: "/webConfig/image", name: "导航图片管理", component: () => import('@/views/webConfig/image/index.vue') },
          { path: "/webConfig/navigation", name: "导航管理", component: () => import('@/views/webConfig/navigation/index.vue') },
        ]
      },
      {
        path: "/webBusiness", name: "网站业务", component: () => import('@/views/webBusiness/index.vue'), children: [
          { path: "/webBusiness/message", name: "客户留言管理", component: () => import('@/views/webBusiness/message/index.vue') },
        ]
      },
      { path: "/profile", name: "个人中心", component: () => import('@/views/main/profile/index.vue') },
    ],
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
