import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/views/StartSDK').default
      // component: require('@/views/LeftNav').default
    },
    {
      path: '/home',
      name: 'MainWrap',
      // component: require('@/views/StartSDK').default
      component: require('@/views/LeftNav').default,
      children: [
        {
          path: 'download',
          name: 'Download',
          component: require('@/components/Download').default
        },
        {
          path: 'upload',
          name: 'Upload',
          component: require('@/components/Upload').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
