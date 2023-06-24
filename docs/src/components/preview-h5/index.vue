<template>
  <div :class="bem('wrapper')">
    <header v-if="!isPreview && !isComponentListPage" :class="bem('header')">
      <LeftOutlined size="large" @click="goBack" />
      <h2 :class="bem('header-title')">{{ title }}</h2>
    </header>
    <div :class="bem('content')"><router-view /></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toBoolean } from '@xuanmo/utils'
import { createNamespace } from '@doc/utils'
import { LeftOutlined } from '@xuanmo/dl-icons'

const [name, bem] = createNamespace('preview-mobile')

export default defineComponent({
  name,
  components: {
    LeftOutlined
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const title = computed(() => route.path.split('/').reverse()[0])

    const isComponentListPage = computed(() => route.path.indexOf('component-list') > 0)

    const isPreview = computed(() => toBoolean(route.query.preview))

    onMounted(() => {
      document.querySelector('html')?.classList.add('mobile')
    })

    const goBack = () => router.go(-1)

    return {
      title,
      isComponentListPage,
      isPreview,
      bem,
      goBack
    }
  }
})
</script>

<style lang="scss">
.dl-preview-mobile {
  &__wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  &__header {
    display: flex;
    align-items: center;
    padding: var(--d-gap-xs) var(--d-gap-sm);
    background-color: var(--d-white-color);
    box-shadow: var(--d-box-shadow-1);

    &-title {
      flex: 1;
      text-align: center;
      text-transform: capitalize;
    }
  }

  &__content {
    flex: 1;
    overflow: auto;
    padding: 0 var(--d-gap-sm) var(--d-gap-sm);
    background: #f7f8fa;

    &.bg-white {
      background: #fff;
    }

    & > :first-child {
      margin-top: var(--d-gap-sm);
    }
  }
}
</style>
