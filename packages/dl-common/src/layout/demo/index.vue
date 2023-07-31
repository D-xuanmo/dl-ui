<template>
  <d-layout style="margin: 0">
    <d-layout-header>header</d-layout-header>
    <d-layout-sider collapsed>
      <p v-for="i in 100" :key="i">sider{{ i }}</p>
    </d-layout-sider>
    <d-layout-content>
      <p v-for="i in 100" :key="i">content{{ i }}</p>
    </d-layout-content>
    <d-layout-sider collapsed placement="right">
      <p v-for="i in 100" :key="i">sider{{ i }}</p>
    </d-layout-sider>
    <d-layout-footer height="80px">footer</d-layout-footer>
  </d-layout>
</template>
