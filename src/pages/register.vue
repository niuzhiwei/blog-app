<!-- 注册 -->
<template>
  <div class="register">
    <h4>用户名</h4>
    <el-input size="medium" v-model="username" placeholder="用户名"></el-input>
    <h4>密码</h4>
    <el-input size="medium" type="password" v-model="password" placeholder="密码" @key.enter="onLogin"></el-input>
    <el-button type="primary" @click="onRegister">立即注册</el-button>
    <p class="notice">已有帐号?<router-link to="/login">立即登录</router-link></p>
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
    ...mapActions(['register']),
    onRegister(){
      this.register({username:this.username,password:this.password})
      .then(()=>{
        this.$router.push({path:'/'})
      })
    }
  }
}

</script>
<style lang='stylus' scoped>
.register
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