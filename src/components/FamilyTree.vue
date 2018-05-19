<template>
   <div class="col-md-9 panel panel-default">
    <md-progress-spinner v-show="spinner" class="md-accent" md-mode="indeterminate"></md-progress-spinner>
    <hierarchical-edge-bundling class="graph-root" ref="graph" :maxTextWidth="50" identifier="id" :duration="duration" @mouseNodeOver="mouseNodeOver" @mouseNodeOut="mouseNodeOut" @clicked="clicked" :data="tree" :links="links" node-text="text" :margin-x="marginX" :margin-y="marginY"/>
  </div>

</template>

<script>
import {hierarchicalEdgeBundling} from 'vued3tree'
import EventLogger from './EventLogger'
import _ from 'lodash'
import axios from 'axios'

let buildTree = (arr) => {
  var nodes = {};
  return arr.filter(function(obj){
      var id = obj["id"],
          parentId = obj["parent"];

      nodes[id] = _.defaults(obj, nodes[id], { children: [] });
      parentId && (nodes[parentId] = (nodes[parentId] || { children: [] }))["children"].push(obj);

      return !parentId;
  });
}
const getLinks = (arr) => {
  let links = [];
  _.forEach(arr, (a) => {
    let father = a.father && {source: a.id, target: a.father, type: 1}
    let mother = a.mother && {source: a.id, target: a.mother, type: 1}
    let marriedTo = a.marriedTo && {source: a.id, target: a.marriedTo, type: 3}
    if (father) {
      links.push(father)
    }
    if (mother) {
      links.push(mother)
    }
    if (marriedTo) {
      links.push(marriedTo)
    }
  });
  return links;
}

const data = {
  duration: 750,
  marginX: 30,
  marginY: 30,
  events: [],
  loading: false,
  highlightedNode: null,
  tree: {},
  links: [],
  spinner: true
}

export default {
  name: 'app',
  data () {
    return data
  },
  props: ['links', 'tree', 'spinner'],
  mounted () {
    let self = this
    axios.get(process.env.awsProfilesApi + '/profiles', { crossdomain: true })
      .then(response => {
        let profiles = response.data
        self.spinner = false;
        self.links = getLinks(profiles)
        self.tree = { "text": "Root", "id":0, children: buildTree(profiles)}
      })
  },
  components: {
    hierarchicalEdgeBundling,
    EventLogger
  },
  methods: {
    changeCurrent (value) {
      this.loading = true
      window.setTimeout(() => {
        this.highlightedNode = value
        this.loading = false
      })
    },
    onEvent (eventName, data) {
      console.log(eventName, data)
      this.events.push({eventName, data: data.data})
    },
    mouseNodeOver (event) {
      this.onEvent('mouseNodeOver', event)
      this.changeCurrent(event.element)
    },
    mouseNodeOut (event) {
      this.onEvent('mouseNodeOut', event)
      this.changeCurrent(null)
    },
    onClick (event) {
      this.onEvent('clicked', event)
      let profileId = _.get(data, 'id');
      this.router.push({ name: 'profile', params: { profileId }})
    }
  },
  watch: {
    highlightedNode (value) {
      this.$refs['graph'].highlightedNode = value
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
.tree {
  height: 600px;
  width: 100%;
}
.graph-root {
  height: 800px;
  width: 100%;
}
.md-progress-spinner {
  margin: 24px;
}
</style>
