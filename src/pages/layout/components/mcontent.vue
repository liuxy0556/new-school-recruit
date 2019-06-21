<template>
  <div class="m-content full-page">
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {}
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>

  .m-content {
    height: 100%;
    overflow: hidden;
    background-color: $bgColor;
  }
</style>



