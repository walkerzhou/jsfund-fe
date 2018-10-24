<template>
  <div class="ceiling">
    <div class="ceiling-main">
      <div class="app-logo">
        <img src="../../assets/logo.png" />
      </div>
      <div class="app-name">
        后台管理后台
      </div>
    </div>
    <div class="ceiling-sidebar">
      <span><Icon type="clock"></Icon> {{currentDate}}</span>
      <span class="left-10"><Icon type="person"></Icon> {{username}}</span>
      <span class="left-10"><Button type="text" @click="logOut"><Icon type="log-out"></Icon> 退出</Button></span>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getCookie } from '../../util/index'
  import common from '@/util/common'
  export default {
    data () {
      return {
      }
    },
    created () {
      this.getUserName()
    },
    methods: {
      logOut () {
        // window.location.href = 'https://www.bilibili.com/'
      },
      getUserName () {
        let username = getCookie('username')

        if (username === '') {
          // window.location.href = 'http://dashboard-mng.bilibili.co/login.html?caller=cm-mng-manager'
        } else {
          this.$store.dispatch('setUsername', username)
        }
      }
    },
    computed: {
      currentDate () {
        return common.getCurrentDate()
      },
      ...mapGetters([
        'username'
      ])
    }
  }
</script>

<style lang="scss">
  @import '../../assets/css/mixin';
  .ceiling {
    @include flex(space-between, center);
    background: #464c5b;
    height: 50px;
    padding: 10px;
    .ceiling-main {
      @include flex(flex-start, center);
      .app-logo {
        img {
          width: 50px;
        }
      }
      .app-name {
        font-size: 20px;
        color: white;
      }
    }
    .ceiling-sidebar {
      span,a {
        color: #9ba7b5;
      }
      span.left-10 {
        margin-left: 10px;
      }
    }    
  }
</style>