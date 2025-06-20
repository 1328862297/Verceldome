<script setup>

</script>

<template>
 <div class="h100">
    <!-- 路由组件渲染出品 -->
    <router-view></router-view>
  </div>
</template>

<style >
@import "tailwindcss";
* {
    margin: 0;
    padding: 0;
    border: 0;
    font-family: inherit;
    font-size: 100%;
    vertical-align: baseline;
}
html {
    line-height: 1;
}
body {
  font-family: 'Noto Serif SC', serif;
  background-color: #fff9fb;
}
</style>
