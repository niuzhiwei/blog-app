<!-- 头部导航 -->
<template>
  <div class="container">
    <div class="header" v-if="!isLogin">
      <h1><router-link to="/">Let's Share</router-link></h1>
      <p>精品博客汇聚</p>
      <div class="btns">
        <router-link to="/login"> <el-button size="mini">立即登录</el-button></router-link>
       <router-link to="/register"><el-button size="mini">注册账号</el-button></router-link>
      </div>
    </div>
    <div class="header-login" v-if="isLogin">
      <h1 class="title"><router-link to="/">Let's Share</router-link></h1>
      <div class="user">
        <router-link to="/create"><i class="edit el-icon-plus"></i></router-link>
        <img class="avatar" :src="user.avatar" :title="user.username">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><router-link to="/my">我的</router-link></el-dropdown-item>
            <el-dropdown-item command="b">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['isLogin', 'user'])
  },
  components: {},
  created() {
    this.checkLogin()
  },
  methods: {
    ...mapActions(['checkLogin', 'logout']),
    handleCommand(command) {
        if(command == 'b'){
          this.logout();
        }
      }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/common.styl';
.container
  width 100%
  .header
    margin-bottom .1rem
    margin-top .1rem
    h1
      font-size .4rem
      padding-bottom .1rem
      font-weight 800
      a
        color #fff
        text-transform:uppercase
    p
      font-size .3rem
      color #ffffff
      padding 0.1rem 0
    .btns
      .el-button
        color $bgColor
        font-size .28rem
  .header-login
    margin-bottom .3rem
    margin-top .3rem
    display flex
    justify-content space-between
    align-items center
    .title
      margin-left .3rem
      font-size .5rem
      a
       color #fff
       text-transform uppercase
       font-weight 800
    .user
      margin-right .3rem
      a
        color #fff
        font-size .7rem
        vertical-align middle
      .avatar
        border-radius 50%
        width 1rem
      .el-dropdown
          font-size .4rem
          color #ffffff
          vertical-align middle
</style>