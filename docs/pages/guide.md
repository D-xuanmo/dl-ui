---
title: '组件开发指南'
---

# 组件开发规范说明

## 项目目录说明

- `docs` 组件开发、文档目录
- `docs/pages` 文档页面，格式为 `markdown`，用于运行 `Vue` 组件及文档书写说明，会自动根据文件名生成路由相关信息
- `packages` 组件源码目录
- `packages/utils` 全局工具类方法
- `packages/hooks` 公用 `hooks`
- `packages/*` 其他目录为组件目录，命名规范 `kebab-case`

### 文档编写说明

- 一个 `md` 文件代表一个组件的使用说明，以 `packages/example` 为例，访问路径为 `http://localhost:{port}/example`
- `docs/constants/menus.ts` 文档需要在此文件追加路由信息，否则不会生成左侧菜单项

### 组件开发目录说明

- `index.ts` 组件对外导出入口文件，入口文件不做逻辑处理， `packages/example` 为示例目录
- `component.{vue,tsx}` 具体组件，可以多个，命名规范：`kebab-case`
- `types.ts` 当前组件类型申明文件

```text
dynamic-form
├── README.md
├── docs
│   ├── App.vue
│   ├── assets
│   │   └── style
│   ├── components
│   │   └── menu
│   │       ├── format.ts
│   │       ├── index.tsx
│   │       ├── style.scss
│   │       └── types.ts
│   ├── constants
│   │   └── menus.ts
│   ├── env.d.ts
│   ├── main.ts
│   ├── pages
│   │   ├── example-bem.md
│   │   ├── example.md
│   │   └── guide.md
│   └── routes
│       └── index.ts
├── index.html
├── package.json
├── packages
│   ├── example
│   │   ├── example.vue
│   │   ├── example-bem.vue
│   │   └── index.ts
│   ├── hooks
│   ├── index.ts
│   ├── input
│   ├── layout
│   ├── style
│   │   ├── index.scss
│   │   ├── prefix.scss
│   │   └── var.scss
│   └── utils
│       ├── bem.ts
│       └── with-install.ts
├── public
│   └── favicon.ico
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── yarn.lock

```
