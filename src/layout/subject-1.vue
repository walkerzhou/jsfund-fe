<template>
  <div class="subject-container">
    <!-- 主区域 -->
    <div class="page-container">
      <div class="page-main">
        <div class="page-main-wrapper">
          <Row style="padding:10px 20px">
            <img src="../assets/top.svg" height="40px"/>
          </Row>
          <div class="page-view" id="pageview" :sytle="getStyleHeight()">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Ceiling from './section/Ceiling.vue'
import MyMenu from './section/Menu.vue'
import Breadcrumb from './section/Breadcrumb.vue'
import menuData from '@router/menu_data.js'

export default {
  name: 'subject-1',
  data () {
    return {
      menuOption: {
        menuData
      }
    }
  },
  created () {
    this.watchRoute()
  },
  watch: {
    '$route' (to, from) {
      this.watchRoute()
    }
  },
  computed: {
  },
  methods: {
    // 路由监听
    watchRoute () {
      // console.log('路由监听...', this.$route)
      this.$store.dispatch('updateBreadCrumb', this.$route)
    },
    getStyleHeight () {
      // let height = 0
      // let doc = document.getElementById('pageview')
      // height = doc.offsetHeight
      // return {height: `${height}px;`}
    }
  },
  components: {
    Ceiling,
    MyMenu,
    Breadcrumb
  }
}
</script>

<style lang="scss">
  @import '../assets/css/mixin';
  .subject-container {
    @include flex-column(flex-start, stretch);
    background: #f5f7f9;
    height: 100%;
    .page-container {
      flex: 1;
      overflow: hidden;
      .page-main {
        width: 100%;
        min-height: 200px;
        height: 100%;
        .page-main-wrapper {
          height: 100%;
          @include flex-column(flex-start, stretch);
          .page-view {
            flex: 1;
            padding: 10px;
            background: #fff;
            height: 100%;
            overflow-y: auto;
            box-shadow: 0 1px 1px 0 rgba(0,0,0,.2);
          } 
        }
      }
    }
  }
</style>
