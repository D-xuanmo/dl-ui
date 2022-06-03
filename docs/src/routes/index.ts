import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

/**
 * 遍历所有的路由
 * path 规则为：文件名
 * @example
 * 'pages/example.md' 访问路径为：/example
 */
const getRoutes = () => {
  const modules = import.meta.glob('../pages/**/*.md')
  const routes: RouteRecordRaw[] = []
  for (const [key, module] of Object.entries(modules)) {
    const { path } = /(?<path>\/[a-z\d-]+)\.md$/.exec(key)?.groups ?? {}
    routes.push({
      path,
      component: module
    })
  }
  return routes
}

const routes = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/guide'
    },
    ...getRoutes()
  ]
})

export default routes
