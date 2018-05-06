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
            Future Vet
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

export default {
  name: 'Profile',
  props: ['firstname', 'nickName', 'id']
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
