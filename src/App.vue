<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    created () {
      console.log('V 1.1.061801')
    }
  }
</script>

<style lang="scss">
  #app {
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #fff;
  }
</style>
