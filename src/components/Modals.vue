<template>
  <Modal
    v-model="options.isShow"
    :title="options.title || ''"
    :width="options.width || 800"
    :class-name="'ivu-modal-wrap-costom ' + (options['className'] || '')"
    :closable="false"
    :maskClosable="options.maskClosable || false">
    <div v-if="$slots.header" slot="header" class="ivu-modal-header-customer">
      <slot name="header"></slot>
    </div>
    <div class="ivu-modal-body-customer">
      <slot name="content"></slot>
    </div>
    <div v-if="$slots.footer" slot="footer" class="ivu-modal-footer-customer">
      <slot name="footer"></slot>
    </div>
  </Modal>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {},
  components: {}
}
</script>

<style>
  .ivu-modal-body-customer {
    max-height: 800px;
    overflow-y: auto;
  }
</style>
