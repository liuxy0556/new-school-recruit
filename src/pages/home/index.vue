<template>
  <div class="m-content">
    <van-tabs>
      <van-tab v-for="index in 8" :title="'标签 ' + index" :key="index">
        内容 {{ index }}
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>

  export default {
    data() {
      return {

      }
    },
    methods: {

    },
    created () {

    }
  }
</script>

<style lang="scss" scoped>

  .m-content {
    height: 100%;
    background: #31CC99;
  }
</style>
