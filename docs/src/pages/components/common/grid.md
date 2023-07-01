---
columns: 2
---

# Grid 网格

使用 [CSS3 Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/grid) 实现，可实现更灵活的布局。

## 代码演示

```vue client=PC playground=37kdei title=网格1*4
<template>
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
</template>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 10px;
  background: var(--d-gray-3);
  border-radius: 5px;
  box-sizing: border-box;
}
</style>
```

```vue client=PC playground=2q6o4up title=网格3*4
<template>
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
</template>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 10px;
  background: var(--d-gray-3);
  border-radius: 5px;
  box-sizing: border-box;
}
</style>
```

```vue client=PC playground=flrpv3 title=网格4*6
<template>
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
</template>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 10px;
  background: var(--d-gray-3);
  border-radius: 5px;
  box-sizing: border-box;
}
</style>
```

```vue client=PC playground=2irner title=实际场景4*7
<template>
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
        <d-switch>
          <template #icon>
            <bluetooth-outlined size="12" color="var(--d-secondary-text-color)" />
          </template>
        </d-switch>
        蓝牙
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
        <d-switch v-model="xPanel.color" />
        彩色
      </div>
    </d-grid-item>
  </d-grid>
</template>

<script lang="ts" setup>
import { computed, onUnmounted, reactive } from 'vue'
import dateJS from '@xuanmo/datejs'
import { ua } from '@xuanmo/utils'
import { version } from '@xuanmo/dl-ui'
import { BluetoothOutlined } from '@xuanmo/dl-icons'

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

const timer = setInterval(() => {
  xPanel.time = dateJS().format('HH:mm')
}, 1000)

const className = computed(() => ({
  'x-panel': true,
  'x-panel--color': xPanel.color
}))

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.navigator.getBattery?.()?.then((result: any) => {
  xPanel.battery = `${(result.level * 100).toFixed(0)}%`
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style lang="scss" scoped>
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
```

## API

### Grid Props

|参数|类型|默认值|说明|必传|
|---|----|-----|---|----|
|columns|`number`|-|网格列数，列数可随意设置，保证子级的列总和与此参数一致即可|Y|
|gap|`number \| string`|-|子级之间的间隙，`row-gap` 与 `column-gap` 一致时可简写，默认单位：`px`|N|
|row-gap|`number \| string`|-|行与行之间的间隙，默认单位：`px`|N|
|column-gap|`number \| string`|-|列与列之间的间隙，默认单位：`px`|N|

### Grid Item Props

|参数|类型|默认值|说明|必传|
|---|----|-----|---|----|
|row|`number \| string`|1|占用行数|N|
|column|`number \| string`|1|占用列数|N|
