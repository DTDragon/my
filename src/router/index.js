import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HeaderSearch from '@/components/HeaderSearch'
import Content from '@/components/Content'

Vue.use(VueRouter)

export const router =  new VueRouter({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      components: {
        default : HelloWorld,
        headersearch: HeaderSearch
      }
    },
    {
      path: '/content',
      name: 'Content',
      components: {
        default : Content,
        headersearch: HeaderSearch
      }
    },
  ]
})
