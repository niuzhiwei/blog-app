import Vue from 'vue'
import Router from 'vue-router'
// import login from '@/pages/login'
// import index from '@/pages/index'
// import detail from '@/pages/detail'
// import edit from '@/pages/edit'
// import register from '@/pages/register'
// import my from '@/pages/my'
// import user from '@/pages/user'
// import create from '@/pages/create'
import store from '@/store'
Vue.use(Router)
window.store = store

const router = new Router({
  routes:[
    {
      path:'/',
      component:()=>import('@/pages/index')
    },
    {
      path:'/login',
      component:()=>import('@/pages/login')
    },
    {
      path:'/register',
      component:()=>import('@/pages/register')
    },
    {
      path:'/create',
      component:()=>import('@/pages/create'),
      meta:{
        requiresAuth:true
      }
    },
    {
      path:'/user/:userId',
      component:()=>import('@/pages/user')
    },
    {
      path:'/my',
      component:()=>import('@/pages/my'),
      meta:{
        requiresAuth:true
      }
    },
    {
      path:'/edit/:blogId',
      component:()=>import('@/pages/edit'),
      meta:{
        requiresAuth:true
      }
    },
    {
      path:'/detail/:blogId',
      component:()=>import('@/pages/detail')
    }
  ]
})
router.beforeEach((to,from,next)=>{
  if(to.matched.some(record=>record.meta.requiresAuth)){
    store.dispatch('checkLogin').then(isLogin=>{
      if(!isLogin){
        next({
          path:'/login',
          query:{redirect:to.fullPath}
        })
      }else{
        next()
      }
    })
  }else{
    next()
  }
})
export default router