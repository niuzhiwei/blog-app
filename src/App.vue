<template>
  <div id="app">
    <Header id="header"></Header>
    <main id="main">
      <router-view/>
    </main>
    <Footer id="footer"></Footer>
  </div>
</template>

<script>
import Header from '@/components/header'
import Footer from '@/components/footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang='stylus'>
@import './assets/common.styl';
#app
  position relative
  width 100%
  height 100%
  #header
    position fixed 
    background-color $bgColor
    top 0
    width 100%
    text-align center
    z-index 1
  #main
    position absolute 
    top 14%
    height auto 
    width 100%
  #footer
    position fixed
    background-color #fff 
    bottom 0
    height 3%
    width 100%
    text-align center
</style>
