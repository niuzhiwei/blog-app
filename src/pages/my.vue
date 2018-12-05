<!-- 用户页面 -->
<template>
  <div class="my">
    <section class="user-info">
      <img :src="user.avatar" class="avatar">
      <h3>{{user.username}}</h3>
    </section>
    <section class="article">
      <router-link :to="`/detail/${blog.id}`" class="item" v-for="blog in blogs" :key="blog.id" tag="div">
        <div class="date">
          <span class="year">{{splitDate(blog.createdAt).year}}年</span>
          <span class="month">{{splitDate(blog.createdAt).month}}月</span>
          <span class="day">{{splitDate(blog.createdAt).date}}日</span>
        </div>
        <h3>{{blog.title}}</h3>
        <p>{{blog.desrciption}}</p>
        <div class="actions">
          <router-link :to="`/edit/${blog.id}`">编辑</router-link>
          <a href="#" @click.prevent="onDelete(blog.id)">删除</a>
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
import blog from '@/api/blog'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      blogs: [],
      page: 1,
      total: 0
    }
  },

  computed: {
    ...mapGetters(['user'])
  },

  created() {
    this.page = parseInt(this.$route.query.page) || 1
    blog.getBlogsByUserId(this.user.id, { page: this.page }).then(res => {
      console.log(res)
      this.page = res.page
      this.total = res.total
      this.blogs = res.data
    })
  },

  methods: {
    onPageChange(newPage) {
      blog.getBlogsByUserId(this.user.id, { page: newPage }).then(res => {
        console.log(res)
        this.blogs = res.data
        this.total = res.total
        this.page = res.page
        this.$router.push({ path: '/my', query: { page: newPage } })
      })
    },

    async onDelete(blogId) {
      console.log(blogId)
      await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await blog.deleteBlog({ blogId })
      this.$message.success('删除成功')
      this.blogs = this.blogs.filter(blog => blog.id != blogId)
    },

    splitDate(dataStr) {
      let dateObj = typeof dataStr === 'object' ? dataStr : new Date(dataStr)
      return {
        date: dateObj.getDate(),
        month: dateObj.getMonth() + 1,
        year: dateObj.getFullYear()
      }
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/common.styl';

.my 
  width 80%
  margin 0 auto
  display flex
  flex-direction column
  .user-info
    margin-bottom .4rem
    display flex 
    align-items center
    img 
      border-radius 50%
      width 1rem
      margin-right .4rem
    h3 
      font-size .35rem
      color #000000
  .article
    .date
      color $textLighterColor
    h3
      font-size .4rem
      margin-top .2rem
      margin-bottom .3rem
  .page
    position fixed
    bottom 5%
</style>