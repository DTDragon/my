import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HeaderSearch from '@/components/HeaderSearch'
import DemoContent from '@/components/DemoContent'

Vue.use(VueRouter)

export const router =  new VueRouter({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/democontent',
      name: 'DemoContent',
      component: DemoContent,
    },
    // {
    //   path: '/headersearch',
    //   name: 'helloworld',
    //   components: {
    //     helloworld : HelloWorld,
    //     // headersearch: HeaderSearch
    //   }
    // },
    // {
    //   path: '/content',
    //   name: 'Content',
    //   components: {
    //     default : Content,
    //     headersearch: HeaderSearch
    //   }
    // },
  ]
})
