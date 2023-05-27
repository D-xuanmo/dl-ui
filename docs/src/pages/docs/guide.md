# 组件开发规范说明

## 项目目录说明

- `docs` 文档目录
- `docs/src/pages` 文档页面，格式为 `markdown`，用于运行 `Vue` 组件及文档书写说明，会自动根据文件名生成路由相关信息
- `packages/dl-common` 全局公用方法、样式、组件（PC、H5）
- `packages/dl-icons` 独立图标库
- `packages/dl-ui` 组件目录

## 目录、文件命名规则

- 命名规范 `kebab-case`

## 文档编写说明

- 一个 `md` 文件代表一个组件的使用说明，以 `docs/components/example` 为例，访问路径为 `http://localhost:{port}/example`
- `docs/src/menus.ts` 文档需要在此文件追加路由信息，否则不会生成左侧菜单项

## 组件开发目录说明

- `index.ts` 组件对外导出入口文件，入口文件不做逻辑处理， `docs/components/example` 为示例目录
- `component.{vue,tsx}` 具体组件，可以多个，命名规范：`kebab-case`
- `types.ts` 当前组件类型申明文件
- `props.ts` 当前组件 props 申明

## Git commit 提交规范

- 具体提交规范参考 [angular commit](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#-commit-message-format)
- 以修复 `Form` 组件 bug 为例，对应的 commit 为：fix(Form): 修复校验方法报错

![](https://upyun.xuanmo.xin/dl-ui/20230427230129555620.png)
