<template>
  <div class="full-page">
    <m-content></m-content>
  </div>
</template>

<script>
  import mContent from './components/mcontent'

  export default {
    name: "layout",
    data() {
      return {}
    },
    components: { mContent },
    methods: {
      isPC () {
        let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
        let flag = true
        for (let i of Agents) {
          if (navigator.userAgent.indexOf(i) > 0) {
            flag = false
            break
          }
        }
        return flag
      }
    },
    mounted () {
      if (this.isPC()) {
        let html = document.querySelector('html')
        html.style.fontSize = '32px'
        html.style.width = '320px'
        html.style.height = '568px'
        html.style.margin = '0 auto'
        html.style.transform = 'translate(0, 10%)'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pc-class {
    width: 320px;
    margin: 0 auto;
    transform: translateY(50%);
    margin-top: -50%;
  }
</style>
