<template>
  <div>
    <Table
      stripe
      border
      :columns="columns"
      :data="data">
    </Table>
  </div>
</template>
<script>

import util from '../../util/common'

export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  created () {
  },
  data () {
    return {
      columns: [
        {
          title: '编号',
          align: 'center',
          width: 60,
          key: 'seqId'
        },
        {
          title: '文件名',
          align: 'center',
          render: (h, params) => {
            let row = params['row']
            return row.title + '.' + row.fileExt
          }
        },
        {
          title: '日期',
          align: 'center',
          width: 120,
          render: (h, params) => {
            let row = params['row']
            return h('p', util.getDateFormat(row.publishTime))
          }
        },
        {
          title: '操作',
          align: 'center',
          width: 80,
          render: (h, params) => {
            let row = params['row']
            return h(
              'Button',
              {
                props: {
                  type: 'warning'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.goDownload(row)
                  }
                }
              },
              '下载'
            )
          }
        }
      ]
    }
  },
  methods: {
    goDownload(row) {
      window.open(row.downloadUrl)
    }
  },
  components: {
  }
}
</script>
<style>
</style>