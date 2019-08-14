<template>
  <div id="app">
      <header-search></header-search>
  </div>
</template>

<script>
import HeaderSearch from '@/components/HeaderSearch'
export default {
  name: 'App',
  components: {
    HeaderSearch
  },
}

</script>

<style lang="less" scoped>
  body{
    height: 100%;
    overflow-x: hidden;
  }
  html{
    height: 100%;
    overflow-x: hidden;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
  }
</style>

