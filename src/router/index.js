import Vue from 'vue'
import Router from 'vue-router'
import Profiles from '@/components/Profiles'
import Profile from '@/components/Profile'
import FamilyTree from '@/components/FamilyTree'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FamilyTree',
      component: FamilyTree
    },
    {
      path: '/tree',
      name: 'FamilyTree',
      component: FamilyTree
    },
    {
      path: '/profile/:id',
      name: 'Profile',
      component: Profile
    }
  ]
})
