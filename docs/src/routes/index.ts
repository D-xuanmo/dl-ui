import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { ua } from '@xuanmo/javascript-utils'

const generateRoutes = (modules: Record<string, () => Record<string, any>>) => {
  const routes: RouteRecordRaw[] = []
  for (const [key, module] of Object.entries(modules)) {
    const { path } = /(?<path>\/[a-z\d-]+)\.md$/i.exec(key)?.groups ?? {}
    routes.push({
      path: `/:type${path}`,
      component: module
    })
  }
  return routes
}

/**
 * 遍历所有文档路由
 * path 规则为：文件名
 * @example
 * 'pages/example.md' 访问路径为：/example
 */
const getRoutes = (): RouteRecordRaw[] => {
  const mobileComps = import.meta.glob('../pages/components/mobile/*.md')
  const commonModules = import.meta.glob('../pages/components/common/*.md')
  const docModules = import.meta.glob('../pages/docs/*.md')
  return [
    {
      path: '/comp-common',
      redirect: '/comp-common/button'
    },
    {
      path: '/comp-mobile',
      redirect: '/comp-mobile/cell'
    },
    {
      path: '/docs',
      redirect: '/docs/introduce'
    },
    // ...generateRoutes(compModules, '/comp'),
    ...generateRoutes(mobileComps),
    ...generateRoutes(commonModules),
    ...generateRoutes(docModules)
  ]
}

/**
 * 遍历所有 demo 路由
 * path 规则为：组件目录名
 * @example
 * 访问路径为：/demo/cell
 */
const getDemoRoutes = () => {
  const commonModules = import.meta.glob('../../../packages/dl-common/src/**/demo/*.vue')
  const demoModules = import.meta.glob('../../../packages/dl-ui/src/**/demo/*.vue')
  const routes: RouteRecordRaw[] = [
    {
      path: '/demo/component-list',
      component: () => import('../components/preview-h5/component-list.vue')
    }
  ]
  for (const [key, module] of Object.entries({ ...demoModules, ...commonModules })) {
    const { path, fileName } =
      /(?<path>\/[a-z\d-]+)\/demo\/(?<fileName>[\w-]+)\.vue$/.exec(key)?.groups ?? {}
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
