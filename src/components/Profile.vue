<template>
    <md-content class="md-elevation-24">
      <md-ripple>
        <md-card md-with-hover >
          <md-card-header>
            <md-avatar>
              <img src="https://vuematerial.io/assets/examples/avatar.png" alt="Avatar">
            </md-avatar>

            <div class="md-title">{{ firstname }}</div>
            <div class="md-subhead">{{ nickName }}</div>
          </md-card-header>

          <md-card-media>
            <img src="https://vuematerial.io/assets/examples/card-image-1.jpg" alt="People">
          </md-card-media>

          <md-card-content>
            {{ firstname }}
          </md-card-content>
          <md-card-content>
            id = {{ id }}
          </md-card-content>

          <md-card-actions>
            <md-button>Action</md-button>
            <md-button>Action</md-button>
          </md-card-actions>
        </md-card>
      </md-ripple>

    </md-content>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'

export default {
  name: 'Profile',
  props: ['firstname', 'nickName', 'id'],
  data () {
    return {
      firstname: 'Junior'
    }
  },
  mounted () {
    let self = this;
    let profileId = _.get(this.$route, 'params.id');
    axios.get(process.env.awsProfilesApi + '/profile/' + profileId, { crossdomain: true })
      .then(response => {
        self.firstname = response.data.firstname;
        self.nickName = response.data.nickName;
        self.id = response.data.id;
      })
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
  width: 400px;
  height: 400px;
  margin: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
