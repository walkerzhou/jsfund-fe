<template>
<div class="layout-breadcrumb">
  <Breadcrumb>
    <Breadcrumb-item v-for="(bread, index) in breadCrumb" :key="index">
      <slot>
        <a @click="breadClick(bread)">
          <Icon :type="bread.breadIcon"></Icon> {{bread.breadName}}
        </a>
      </slot>
    </Breadcrumb-item>
  </Breadcrumb>
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    created () {
    },
    computed: {
      ...mapGetters([
        'breadCrumb'
      ])
    },
    watch: {
    },
    methods: {
      breadClick (bread) {
        let {routeName} = bread
        let params = {}
        let reg = new RegExp('(?<=:)(\\w+)', 'g')
        let match = bread.path.match(reg) || []
        match.forEach(key => {
          params[key] = this.$route.params[key]
        })
        this.$router.push({name: routeName, params})
      }
    }
  }
</script>

<style lang="scss">
.layout-breadcrumb {
  padding-left: 10px;
  margin-bottom: 15px;
}
</style>
