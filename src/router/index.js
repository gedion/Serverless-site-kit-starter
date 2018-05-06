import Vue from 'vue'
import Router from 'vue-router'
import Profiles from '@/components/Profiles'
import FamilyTree from '@/components/FamilyTree'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Profiles',
      component: Profiles
    },
    {
      path: '/tree',
      name: 'FamilyTree',
      component: FamilyTree
    }
  ]
})
