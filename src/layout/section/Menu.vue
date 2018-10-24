<template>
  <Menu theme="dark" class="my-menu" width="auto" @on-select="itemClick" :active-name="activeName" :open-names="openName">
    <Submenu :name="i" v-for="(item, i) in option.menuData" :key="i">
      <template slot="title">
        <Icon :type="item.icon" v-if="item.icon"></Icon>
        <span>{{item.title}}</span>
      </template>
      <MenuItem :name="child.name" v-for="(child, j) in item.children" :key="j">
        <Icon :type="child.icon" size="14" v-if="child.icon"></Icon>
        <span>{{child.title}}</span>
      </MenuItem>
    </Submenu>
  </Menu>
</template>

<script>
  // import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
      }
    },
    props: [
      'option'
    ],
    computed: {
      // 当前激活的菜单项
      activeName () {
        return this.$route.name
      },
      // 当前展开的菜单目录
      openName () {
        let currentName = this.$route.name
        if (!currentName) return
        let menuList = this.option.menuData
        for (let i = 0; i < menuList.length; i++) {
          let children = menuList[i].children || []
          for (let j = 0; j < children.length; j++) {
            if (children[j]['name'] === currentName) {
              return [i]
            }
          }
        }
      }
    },
    methods: {
      itemClick (name) {
        this.$router.push({name: name})
      }
    }
  }
</script>

<style lang="scss">
.my-menu {
  height: 100%;
  .sys-logo {
    width: 90%;
    height: 30px;
    line-height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 0 auto;    
    color: white;
    text-align: center;
  }
  .ivu-col{
    transition: width .2s ease-in-out;
  }    
}

</style>
