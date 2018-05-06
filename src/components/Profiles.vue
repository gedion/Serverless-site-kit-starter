<template>
 <div>
   <md-ripple>
     <md-button class='md-accent' v-on:click='addProfile' >
        Add Profile
     </md-button>
   </md-ripple>
   <br>
   <div class='profiles'>
     <profile v-for='profile in profiles'
       v-bind:key='profile.id'
       v-bind:name='profile.name'
       is='profile'
       v-bind:nickName='profile.nickName'>
     </profile>
   </div>
   <tree :data='tree' :node-text='name' layoutType='circular'>
</tree>
 </div>
</template>

<script>
import Profile from '@/components/Profile'
import axios from 'axios'
import tree from 'vued3tree'

export default {
  components: {
    profile: Profile,
    props: ['profiles', 'tree'],
    tree: tree
  },
  methods: {
    addProfile: function () {
      console.log('profiles nextProfileId ', this.nextProfileId)
      let profile = {
        id: this.nextProfileId++,
        name: 'Junior',
        nickName: 'Buddy'
      }
      this.profiles.push(profile)
    }
  },
  name: 'Profiles',
  mounted () {
    let self = this
    axios.get(process.env.awsProfilesApi + '/profiles', { crossdomain: true })
      .then(response => {
        self.profiles = response.data
      })
  },
  data () {
    return {
      title: 'The Family Tree',
      profiles: [],
      nextProfileId: 4,
      tree: {
        name: 'father',
        children:[{
          name: 'son1',
          children:[ {name: 'grandson'}, {name: 'grandson2'}]
        },{
          name: 'son2',
          children:[ {name: 'grandson3'}, {name: 'grandson4'}]
        }]
      }

    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.profiles {
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
}

.md-content {
  width: 100px;
  height: 100px;
  margin: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
