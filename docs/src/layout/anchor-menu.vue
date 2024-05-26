<template>
  <ul class="anchor-menu">
    <li
      v-for="item in data"
      :key="item.id"
      class="anchor-menu__item"
      :class="{ 'anchor-menu__item--active': isActive(item.link) }"
    >
      <a :href="item.link" class="anchor-menu__link" :title="item.content">{{ item.content }}</a>
      <anchor-menu :data="item.children" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { AnchorItem } from '@doc/store'

defineProps<{
  data: AnchorItem[]
}>()

const isActive = (link: string) => decodeURI(window.location.hash) === link
</script>

<style lang="scss" scoped>
.anchor-menu {
  font-size: 12px;

  &__item {
    list-style: none;

    &--active {
      > .anchor-menu__link {
        color: var(--d-primary);
      }
    }

    .anchor-menu {
      padding-left: 18px;
    }
  }

  &__link {
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    text-wrap: nowrap;
    word-break: keep-all;
    color: var(--d-primary-text-color);

    &:hover {
      color: var(--d-primary);
    }
  }
}
</style>
