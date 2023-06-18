<template>
  <dl-demo-block title="网格 1 * 4">
    <d-grid :columns="4" :gap="8">
      <d-grid-item :row="1" :column="1">
        <div class="item">1 * 1</div>
      </d-grid-item>
      <d-grid-item :row="1" :column="1">
        <div class="item">1 * 1</div>
      </d-grid-item>
      <d-grid-item :row="1" :column="1">
        <div class="item">1 * 1</div>
      </d-grid-item>
      <d-grid-item :row="1" :column="1">
        <div class="item">1 * 1</div>
      </d-grid-item>
    </d-grid>
  </dl-demo-block>

  <dl-demo-block title="网格 3 * 4">
    <d-grid :columns="4" :gap="8">
      <d-grid-item :row="3" :column="1">
        <div class="item">3 * 1</div>
      </d-grid-item>
      <d-grid-item :row="1" :column="3">
        <div class="item">1 * 3</div>
      </d-grid-item>
      <d-grid-item :row="2" :column="1">
        <div class="item">2 * 1</div>
      </d-grid-item>
      <d-grid-item :row="1" :column="2">
        <div class="item">1 * 2</div>
      </d-grid-item>
      <d-grid-item :row="1" :column="1">
        <div class="item">1 * 1</div>
      </d-grid-item>
      <d-grid-item :row="1" :column="1">
        <div class="item">1 * 1</div>
      </d-grid-item>
    </d-grid>
  </dl-demo-block>

  <dl-demo-block title="网格 4 * 6">
    <d-grid :columns="6" :gap="8">
      <d-grid-item :row="3" :column="2">
        <div class="item">3 * 2</div>
      </d-grid-item>
      <d-grid-item :row="1" :column="3">
        <div class="item">1 * 3</div>
      </d-grid-item>
      <d-grid-item :row="4" :column="1">
        <div class="item">4 * 1</div>
      </d-grid-item>
      <d-grid-item :row="2" :column="1">
        <div class="item">2 * 1</div>
      </d-grid-item>
      <d-grid-item :row="1" :column="1">
        <div class="item">1 * 1</div>
      </d-grid-item>
      <d-grid-item :row="1" :column="1">
        <div class="item">1 * 1</div>
      </d-grid-item>
      <d-grid-item :row="1" :column="1">
        <div class="item">1 * 1</div>
      </d-grid-item>
      <d-grid-item :row="1" :column="1">
        <div class="item">1 * 1</div>
      </d-grid-item>
      <d-grid-item :row="1" :column="1">
        <div class="item">1 * 1</div>
      </d-grid-item>
      <d-grid-item :row="1" :column="4">
        <div class="item">1 * 4</div>
      </d-grid-item>
    </d-grid>
  </dl-demo-block>

  <dl-demo-block title="场景 4 * 7">
    <d-grid :columns="7" :gap="6" :class="className">
      <d-grid-item :row="3" :column="2">
        <div class="x-panel__date">
          <p>{{ xPanel.week }}</p>
          <p>{{ xPanel.day }}</p>
          <p>{{ xPanel.month }}</p>
        </div>
      </d-grid-item>
      <d-grid-item :row="1" :column="1">
        <div class="x-panel__time">{{ xPanel.time }}</div>
      </d-grid-item>
      <d-grid-item :row="1" :column="1">
        <div class="x-panel__bluetooth">
          <d-switch size="small" />
          <p>蓝牙</p>
        </div>
      </d-grid-item>
      <d-grid-item :row="1" :column="3">
        <div class="x-panel__battery">
          <span class="x-panel__battery--active" :style="{ width: xPanel.battery }"></span>
          <p>电量：{{ xPanel.battery }}</p>
        </div>
      </d-grid-item>
      <d-grid-item :row="2" :column="3">
        <div class="x-panel__os">
          <p>{{ xPanel.os }}</p>
          <p>{{ xPanel.browser }}</p>
        </div>
      </d-grid-item>
      <d-grid-item :row="3" :column="2">
        <div class="x-panel__image">
          <d-image src="https://upyun.xuanmo.xin/logo/dl-ui.svg" />
          <p>{{ version }}</p>
        </div>
      </d-grid-item>
      <d-grid-item :row="1" :column="2">
        <div class="x-panel__os">
          <d-image src="https://upyun.xuanmo.xin/images/x-logo.svg" />
        </div>
      </d-grid-item>
      <d-grid-item :row="1" :column="1">
        <div class="x-panel__line">
          {{ xPanel.onLine ? '已联网' : '已离线' }}
        </div>
      </d-grid-item>
      <d-grid-item :row="1" :column="2">
        <div class="x-panel__os">
          <d-switch v-model="xPanel.color" size="small" />
          彩色
        </div>
      </d-grid-item>
    </d-grid>
  </dl-demo-block>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
import dateJS from '@xuanmo/datejs'
import { ua } from '@xuanmo/javascript-utils'
import { version } from '@xuanmo/dl-ui'

const uaInfo = ua()
const xPanel = reactive({
  battery: '100%',
  day: dateJS().format('d'),
  month: dateJS().format('yyyy.MM'),
  week: dateJS().format('CW'),
  time: dateJS().format('HH:mm'),
  os: `${uaInfo.os} ${uaInfo.osVersion}`,
  browser: `${uaInfo.browser} ${uaInfo.browserVersion}`,
  onLine: navigator.onLine,
  color: false
})

const className = computed(() => ({
  'x-panel': true,
  'x-panel--color': xPanel.color
}))

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.navigator.getBattery?.()?.then((result: any) => {
  xPanel.battery = `${result.level * 100}%`
})
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 10px;
  background: var(--d-gray-2);
  border-radius: 5px;
  box-sizing: border-box;
}

[class*='x-panel__'] {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 5px;
  background: #fff;
  border-radius: 3px;
  box-sizing: border-box;
  text-align: center;
}

.x-panel {
  padding: 8px;
  border-radius: 5px;
  background: var(--d-gray-2);

  &--color {
    background: #bc4e9c;
    background: -webkit-linear-gradient(to right, #f80759, #bc4e9c);
    background: linear-gradient(to right, #f80759, #bc4e9c);
  }

  &__date {
    flex-direction: column;

    :nth-child(2) {
      margin: 16px 0;
      font-size: 28px;
    }
  }

  &__time {
    font-size: 18px;
  }

  &__battery {
    position: relative;
    z-index: 1;
    overflow: hidden;

    &--active {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      height: 100%;
      background: var(--d-success);
    }
  }

  &__os {
    font-size: 12px;
  }

  &__image {
    padding: 0;
  }

  &__os,
  &__image,
  &__bluetooth {
    flex-direction: column;
  }
}
</style>
