---
title: '组件开发指南'
---

# 组件开发规范说明


## 项目目录说明
- `docs` 组件开发、文档目录
- `packages` 组件源码目录

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
│   │   ├── Example.vue
│   │   ├── ExampleBEM.vue
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
