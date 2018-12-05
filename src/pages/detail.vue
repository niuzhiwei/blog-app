<!-- 详情页面 -->
<template>
  <div class="detail">
    <section class="user-info"> 
        <router-link :to="`/user/${user.id}`" tag="div" class="avatar">
          <img :src="user.avatar" alt="">
        </router-link>
      <div class="title">
      <h3 class="article-name">{{title}}</h3>
      <div class="author">
        <router-link :to="`/user/${user.id}`">{{user.username}}</router-link> 发布于<span>{{friendlyDate(createdAt)}}</span>
      </div>
      </div>
    </section>
    <section class="article" v-html="markdown">
    </section>
  </div>
</template>

<script>
import marked from 'marked'
import blog from '@/api/blog'
export default {
  data() {
    return {
      title:'',
      rowContent:'',
      user:{},
      createdAt:''
    }
  },
  created(){
   this.blogId = this.$route.params.blogId
   blog.getDetail({blogId:this.blogId})
   .then(res=>{
     console.log(res)
     this.title = res.data.title
     this.rowContent = res.data.content
     this.createdAt = res.data.createdAt
     this.user = res.data.user
   })
  },
  computed:{
    markdown(){
      return marked(this.rowContent)
    }
  },
  components: {},


  methods: {}
}
</script>
<style lang='stylus' scoped>
@import '../assets/common.styl';
@import '../assets/article.css';
.detail
  width 80%
  margin 0 auto
  margin-bottom 5%
  .user-info
    display flex
    align-items center
    img 
      border-radius 50%
      width 1rem
      vertical-align middle
      margin-right .3rem
    .title
      h3
        font-size .4rem
        font-weight 700
      .author
        font-size .3rem
        span 
          font-size .3rem
          color $textLighterColor
  .article
    margin-top .4rem  
    text-indent .2rem 
</style>