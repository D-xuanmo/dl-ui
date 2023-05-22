import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { ua } from '@xuanmo/javascript-utils'

/**
 * 遍历所有文档路由
 * path 规则为：文件名
 * @example
 * 'pages/example.md' 访问路径为：/example
 */
const getRoutes = () => {
  const compModules = import.meta.glob('../pages/components/*.md')
  const docModules = import.meta.glob('../pages/docs/*.md')
  const routes: RouteRecordRaw[] = [
    {
      path: '/components',
      redirect: '/components/cell'
    },
    {
      path: '/docs',
      redirect: '/docs/introduce'
    }
  ]
  for (const [key, module] of Object.entries(compModules)) {
    const { path } = /(?<path>\/[a-z\d-]+)\.md$/i.exec(key)?.groups ?? {}
    routes.push({
      path: `/components${path}`,
      component: module
    })
  }
  for (const [key, module] of Object.entries(docModules)) {
    const { path } = /(?<path>\/[a-z\d-]+)\.md$/i.exec(key)?.groups ?? {}
    routes.push({
      path: `/docs${path}`,
      component: module
    })
  }
  return routes
}

/**
 * 遍历所有 demo 路由
 * path 规则为：组件目录名
 * @example
 * 访问路径为：/demo/cell
 */
const getDemoRoutes = () => {
  const demoModules = import.meta.glob('../../../packages/dl-ui/src/**/demo/*.vue')
  const routes: RouteRecordRaw[] = [
    {
      path: '/demo/component-list',
      component: () => import('../components/preview-h5/component-list.vue')
    }
  ]
  for (const [key, module] of Object.entries(demoModules)) {
    const { path, fileName } =
      /(?<path>\/[a-z\d-]+)\/demo\/(?<fileName>\w+)\.vue$/.exec(key)?.groups ?? {}
    routes.push({
      path: `/demo${path}${fileName === 'index' ? '' : `/${fileName}`}`,
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
      redirect: ua().device === 'Mobile' ? '/demo/component-list' : '/docs/introduce'
    },
    {
      path: '/demo',
      redirect: '/demo/component-list'
    },
    ...getRoutes(),
    ...getDemoRoutes()
  ]
})

export default routes
