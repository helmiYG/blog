import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Homepage from './views/Homepage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: Homepage, 
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/myStory',
      name: 'my story',
      component: () => import('./views/MyStory.vue'),
      children: [
        {
          path: '/myStory',
          name: 'list my Story',
          component: () => import('./components/UserArticle.vue')
        }, 
        {
          path: '/myStory',
          name: 'add article',
          component: () => import('./components/AddArticle.vue')
        }, 
        {
          path: '/myStory/:id',
          name: 'my selected story',
          component: () => import('./components/UserArticleDetail.vue')
        }, 
        {
          path: '/myStory/:id/edit',
          name: 'edit selected story',
          component: () => import('./components/UserArticleEdit.vue')
        },
      ]
    }, 
    {
      path: '/stories',
      name: 'stories',
      component: () => import('./views/Stories.vue'),
      children : [
        {
          path :  '/stories',
          name: 'list article',
          component: () => import('./components/AllArticle.vue'),
        }, 
        {
          path: '/stories/:id',
          name: 'article',
          component: () => import('./components/AllArticleDetail.vue')
        }, 
      ]
    }
  ]
})
