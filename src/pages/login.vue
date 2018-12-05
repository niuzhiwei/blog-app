<!-- 登录页面 -->
<template>
  <div class="login">
    <h4>用户名</h4>
    <el-input size="medium" v-model="username" placeholder="用户名"></el-input>
    <h4>密码</h4>
    <el-input size="medium" type="password" v-model="password" placeholder="密码" @key.enter="onLogin"></el-input>
    <el-button type="primary" @click="onLogin">立即登录</el-button>
    <p class="notice">没有账号?<router-link to="/register">注册新用户</router-link></p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      username:'',
      password:''
    };
  },
  methods: {
    ...mapActions(['login']),
    onLogin(){
      this.login({username:this.username,password:this.password})
      .then(()=>{
        this.$router.push({path:this.$route.query.redirect || '/'})
      })
    }
  }
}

</script>
<style lang='stylus' scoped>
.login
  width 80%
  margin 0 auto
  margin-top 1rem
  h4
    font-size .35rem
    margin-bottom .2rem
    margin-top .2rem
    font-weight 600
  .el-input
    margin-bottom .1rem
  .el-button
    margin-top .2rem
    margin-bottom .3rem
  p
    text-align center
    font-size 12px 
</style>