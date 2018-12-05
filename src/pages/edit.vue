<!-- 编辑博客页面 -->
<template>
  <div class="create">
    <h1>创建文章</h1>
    <h3>文章标题</h3>
    <el-input v-model="title"></el-input>
    <p class="msg">当前输入{{title.length}}个字/限30个字</p>
    <h3>内容简介</h3>
    <el-input v-model="description" type="textarea" rows="3"></el-input>
    <p class="msg">限30个字</p>
    <h3>文章内容</h3>
    <el-input type="textarea" rows="6" v-model="content"></el-input>
    <div class="firstPage">
    <label for="">是否展示到首页</label>
    <el-switch v-model="atIndex" active-color="#13ce66" inactive-color="#ff4949">
    </el-switch>
    </div>
    <el-button type="primary" @click="onEdit">确定</el-button>
  </div>
</template>

<script>
import blog from '@/api/blog'
export default {
  data() {
    return {
      blogId:null,
      title:'',
      description:'',
      content:'',
      atIndex:false
    }
  },
  created(){
    this.blogId = this.$route.params.blogId
   blog.getDetail({blogId:this.blogId})
   .then(res=>{
     this.title = res.data.title
     this.description = res.data.description
     this.content = res.data.content
     this.atIndex = res.data.atIndex
   })
  },

  methods: {
    onEdit(){
      blog.updateBlog({blogId:this.blogId},{title:this.title,content:this.content,description:this.description,atIndex:this.atIndex})
      .then(res=>{
        this.$message.success(res.msg)
        this.$router.push({path:`/detail/${res.data.id}`})
      })
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/common.styl';
.create
  width 80%
  margin 0 auto 
  display flex
  flex-direction column
  h1
    font-size .4rem
    font-weight 800
    margin-bottom .3rem
    color #000
  h3
    font-size .35rem
    margin-bottom .2rem
    margin-top .1rem
  .msg
    margin-top .15rem
    font-size 12px
    color $textLighterColor
    text-align right
  .el-textarea
    margin-bottom .2rem
  .firstPage
    margin-bottom .1rem
    font-size 12px
    color $textLighterColor
    text-align right
  .el-button
    width 30%
</style>