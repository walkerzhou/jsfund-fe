<template>
  <div class="page" v-show="matched">
    <slot>
      <h3>欢迎{{username}}</h3>
    </slot>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
      }
    },
    props: {
      routeName: [String]
    },
    computed: {
      matched () {
        return this.$route.name === this.routeName
      },
      ...mapGetters([
        'username'
      ])
    },
    methods: {
    }
  }
</script>

<style lang="scss">
</style>
