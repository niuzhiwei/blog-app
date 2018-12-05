<!-- 首页 -->
<template>
  <div class="index">
    <section class="blog-posts">
      <router-link class="item" tag="div" v-for="blog in blogs" :to="`/detail/${blog.id}`" :key="blog.id">
        <figure class="avatar">
          <img :src="blog.user.avatar">
          <figcaption>{{blog.user.username}}</figcaption>
        </figure>
        <div class="content">
          <h3>{{blog.title}}
            <span>{{friendlyDate(blog.createdAt)}}</span>
          </h3>
          <p>{{blog.description}}</p>
        </div>
      </router-link>
    </section>
    <section class="page">
      <div class="block">
        <el-pagination layout="prev, pager, next" :total="total" @current-change="onPageChange" :current-page="page">
        </el-pagination>
      </div>
    </section>
  </div>
</template>

<script>
import request from '@/helpers/request.js'
import auth from '@/api/auth.js'
import blog from '@/api/blog.js'

window.request = request
window.auth = auth
window.blog = blog

export default {
  data() {
    return {
      blogs: [],
      total: 0,
      page: 1
    }
  },
  created() {
    let nowage = parseInt(this.$route.query.page) || 1
    blog.getIndexBlogs({ page: nowage }).then(res => {
      this.blogs = res.data
      this.total = res.total
      this.page = res.page
    })
  },
  components: {},

  methods: {
    onPageChange(newPage) {
      blog.getIndexBlogs({ page: newPage }).then(res => {
        this.blogs = res.data
        this.total = res.total
        this.page = res.page
        this.$router.push({ path: `/?page=${newPage}` })
      })
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/common.styl';
.index
  margin-bottom 10%
  margin 0 auto
  width 100%
  .blog-posts
    width 100%
    margin 0 auto
    .item 
      width 80%
      display flex
      align-items center
      margin 0 auto
      border-bottom 1px dashed #ccc  
      margin-top .1rem
      .avatar
        margin-bottom .1rem
        margin-right .6rem
        text-align center
        padding-top .3rem
        max-width 10%
        img 
          border-radius 50%
          width .9rem
          margin-bottom .1rem
        figcaption
          font-size .2rem
      .content
        max-width 85%
        margin-right .1rem
        h3
          font-size .35rem
          color #000
          margin-bottom .2rem
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          span 
            font-size 12px
            color $textLighterColor
        p
          font-size .3rem
          display -webkit-box
          -webkit-box-orient vertical
          -webkit-line-clamp 3
          overflow: hidden  
  .page
    margin-bottom 5%
</style>