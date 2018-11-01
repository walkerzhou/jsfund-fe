<template>
  <div>
    <Grid ref="grid" :grid-option="gridOption" :query-data="queryData"></Grid>

  </div>
</template>
<script>
  import { URLS, BASE_URL } from '../../util/constant'
  import pageMixin from '@views/page_mixin.js'
  import FileList from './FileList.vue'

  export default {
    props: {
      data: {
        type: Object,
        default: function () {
          return {}
        }
      },
      close: {
        type: Function,
        default () {
          return function () {}
        }
      }
    },
    mixins: [pageMixin],
    data() {
      return {
        download_link: BASE_URL,
        dataReady: false,
        // 表格查询条件
        queryData: {
        },
        ajaxOption: {
          json: true
        },
        // 表格字段配置
        gridOption: {
          noNeedPage: true,
          columns: [
            {
              title: '文件名称',
              align: 'center',
              render: (h, params) => {
                let row = params['row']
                return row['title'] + '.PDF'
              }
            },
            {
              title: '操作',
              align: 'center',
              width: 120,
              render: (h, params) => {
                let row = params['row']
                return h(
                  'Button',
                  {
                    props: {
                      type: 'info',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        var url = this.download_link + URLS['GET_OSS_DOWNLOAD_LINK'] + '?bundle_key=' + row.bundleKey
                        this.lookFile(url)
                      }
                    }
                  },
                  '下载'
                )
              }
            }
          ]
        }
      }
    },
    created () {
      this.gridOption.url = URLS['DETAIL_FILE_QUERY'] + '?code=' + this.data.data.code
    },
    methods: {
      onClose() {
        this.close && this.close()
      },
      lookFile (url) {
        window.open(url)
      }
    },
    components: {
      FileList
    }
  }
</script>

<style>
  .value {
    color:blue;
  }
</style>
