// Page组件的混合，需要用到Page组件的模块都可以引入，来简化配置项
import Page from '@layout/section/Page.vue'

export default {
  props: {
    _routeName: [String]
  },
  components: {
    Page
  }
}
