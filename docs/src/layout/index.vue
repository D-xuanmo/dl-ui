<template>
  <d-layout :class="containerClassName">
    <d-layout-header :class="headerClass">
      <doc-header />
    </d-layout-header>

    <d-layout-sider :class="menuClassName">
      <doc-menu :data="menuData" />
    </d-layout-sider>

    <d-layout-content :class="contentClassName">
      <router-view />
      <doc-footer />
    </d-layout-content>
  </d-layout>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getMenuList } from '../menus'
import DocMenu from '../components/menu'
import DocHeader from './doc-header.vue'
import DocFooter from './doc-footer.vue'
import { classNames } from '../utils'

const route = useRoute()

const props = defineProps<{
  isDemoRoute: boolean
}>()

const containerClassName = computed(() => classNames({ mobile: props.isDemoRoute }))
const headerClass = classNames('header')
const menuClassName = classNames('menu')
const contentClassName = classNames('content')

const menuData = computed(() => getMenuList(route.params.type as any))
</script>

<style lang="scss">
.dl-doc {
  font-size: var(--d-font-size-md);
  line-height: var(--d-line-height-lg);

  &__header {
    display: flex;
    padding: 0 var(--d-gap-sm);
    overflow: hidden;

    img {
      height: calc(50px - calc(var(--d-gap-xs) * 2));
      margin-right: var(--d-gap-xs);
      vertical-align: middle;
    }

    h1 {
      display: inline-block;
      vertical-align: middle;
      font-size: 20px;
    }

    .d-button {
      &:hover {
        color: var(--d-primary);
      }
    }

    &-left {
      line-height: 50px;
    }

    &-center {
      flex: 1;
      margin-left: 90px;
    }

    &-center,
    &-right {
      display: flex;
      align-items: center;
    }
  }

  &__multi-columns {
    display: flex;
    justify-content: space-between;

    &-item {
      width: calc(50% - 8px);
    }

    .dl-doc-preview__wrapper {
      margin-bottom: 16px;
    }
  }

  &__menu {
    background: #fff;

    .d-layout-sider__content {
      padding: var(--d-gap-sm);
    }
  }

  &--mobile {
    height: 100%;
    padding: 0;
  }

  &__demo-mobile {
    position: fixed;
    top: 50%;
    right: var(--d-gap-sm);
    width: 375px;
    min-width: 375px;
    height: 600px;
    border: var(--d-border);
    transform: translateY(-50%);
  }

  &__content {
    overflow-y: auto;
    line-height: initial;

    .markdown-body {
      padding: var(--d-gap-sm) 40px;

      > * + * {
        margin-top: 16px;
      }
    }

    ul,
    ol {
      margin-top: var(--d-gap-xs) !important;
    }

    li {
      padding: 4px 0;
      list-style-type: circle;
      list-style-position: inside;

      ul,
      ol {
        padding-left: var(--d-gap-md);
      }
    }

    $h3-font-size: 18px;
    @for $num from 1 through 6 {
      h#{$num} {
        margin: 16px 0;
        border: 0;

        @if $num != 1 {
          margin-top: 24px;
        }

        @if $num == 2 {
          margin: 32px 0 16px !important;
        }

        @if $num > 2 {
          font-size: $h3-font-size - 2px * ($num - 3);
        }
      }
    }

    h1 {
      margin-top: 0;
      font-size: 28px;

      & + * {
        margin-top: 10px;
      }
    }

    > img:not(.d-doc-preview__runtime img) {
      margin-top: var(--d-gap-sm);
      vertical-align: top;
    }

    table {
      width: 100%;
      border: var(--d-border);
      border-collapse: collapse;
      border-radius: var(--d-radius-large);
      overflow: hidden;
      box-shadow: inset 1px 0 0 #e7e7e7, inset -1px -1px 0 #e7e7e7;

      & + * {
        margin-top: var(--d-gap-md);
      }

      thead {
        background-color: var(--d-gray-1);
      }

      tr {
        border: var(--d-border);

        th {
          padding: var(--d-gap-sm);
          border-bottom: var(--d-border);
          text-align: left;
          color: rgba(0, 0, 0, 0.9);

          &:nth-of-type(4) {
            width: 40%;
          }
        }

        td {
          padding: var(--d-gap-sm);

          &:first-of-type {
            font-weight: bold;
          }

          &:nth-of-type(4) {
            width: 40%;
          }
        }
      }
    }

    code:not(&__preview code, pre code) {
      margin: 0 1px;
      padding: 0.2em 0.4em;
      font-size: 0.9em;
      background: #f2f4f5;
      border-radius: 3px;
    }
  }
}
</style>
