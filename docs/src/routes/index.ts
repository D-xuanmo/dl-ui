import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

/**
 * 遍历所有文档路由
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

/**
 * 遍历所有 demo 路由
 * path 规则为：文件名
 * @example
 * 'pages/example.md' 访问路径为：/example
 */
const getDemoRoutes = () => {
  const demoModules = import.meta.glob('../../../packages/src/**/demo.vue')
  const routes: RouteRecordRaw[] = []
  for (const [key, module] of Object.entries(demoModules)) {
    const { path } = /(?<path>\/[a-z\d-]+)\/demo\.vue$/.exec(key)?.groups ?? {}
    routes.push({
      path: `/demo${path}`,
      component: module,
      meta: {
        isDemo: true
      }
    })
  }
  return routes
}

const routes = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/guide'
    },
    ...getRoutes(),
    ...getDemoRoutes()
  ]
})

export default routes
