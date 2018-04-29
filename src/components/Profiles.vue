<template>
 <div>
   <md-ripple>
     <md-button class="md-accent" v-on:click="addProfile" >
        Add Profile
     </md-button>
   </md-ripple>
   <br>
   <div class="profiles">
     <profile v-for="profile in profiles"
       v-bind:key="profile.id"
       v-bind:name="profile.name"
       is="profile"
       v-bind:nickName="profile.nickName">
     </profile>
   </div>
 </div>
</template>

<script>
import Profile from '@/components/Profile'

export default {
  components: {
    profile: Profile,
    props: ['name', 'nickName', 'id']
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
  data () {
    return {
      title: 'The Family Tree',
      profiles: [
        {
          name: 'Elina Elias',
          nickName: 'Garlic Bread',
          id: 1
        },
        {
          name: 'Liya Elias',
          nickName: 'Book of Earings',
          id: 2
        },
        {
          name: 'Arsema',
          nickName: 'Arsema',
          id: 3
        }
      ],
      nextProfileId: 4
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
