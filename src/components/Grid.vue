<template>
  <div class="table-wrapper">
    <Table
      stripe
      border
      :loading="loading"
      :height="gridOption.maxHeight"
      :columns="gridOption.columns"
      :data="gridOption.data"
      :no-data-text="gridOption.noDataText"
      @on-selection-change="onSelectChange">
    </Table>
    <template v-if="!gridOption.noNeedPage">
    <Row type="flex" justify="end" class="page-wrapper">
      <Col>
        <Page 
          placement="top"
          :total="gridOption.total"
          :current="gridOption.page"
          :page-size="gridOption.size"
          :page-size-opts="gridOption.pageSizeOpts"
          :show-sizer="pageOption.showSizer"
          :show-elevator="pageOption.showElevator"
          :show-total="pageOption.showTotal"
          @on-change="pageChange"
          @on-page-size-change="sizeChange">
        </Page>
      </Col>
    </Row>     
  </template>
  </div>
</template>

<script>
  // 默认表格配置
  const defaultGridOption = {
    page: 1,
    size: 10,
    total: 0,
    pageKey: 'page',
    pageSizeKey: 'size',
    pageSizeOpts: [10, 20, 30, 50, 100],
    noDataText: '暂无数据'
  }

  export default {
    props: {
      // grid配置
      gridOption: {
        type: Object,
        required: true
      },
      // 分页配置
      pageOption: {
        type: Object,
        default () {
          return {
            showSizer: true,
            showElevator: true,
            showTotal: true
          }
        }
      },
      // 查询条件字段
      queryData: {
        type: Object
      }
    },
    data () {
      return {
        loading: false,
        currentPage: 1
      }
    },
    created () {
      Object.assign(this.gridOption, defaultGridOption, this.gridOption)
      if (this.gridOption.url) {
        this.query()
      }
    },
    methods: {
      // 表格的选中事件
      onSelectChange (selected) {
        this.gridOption.selected = selected
        this.$emit('select-change', selected)
      },
      // 分页的切页事件
      pageChange (page) {
        this.currentPage = page
        this.$set(this.queryData, 'page', page)
        this.$set(this.gridOption, 'page', page)
        setTimeout(() => {
          this.query()
        }, 0)
      },
      // 分页的改变分页大小的事件
      sizeChange (size) {
        this.$set(this.gridOption, 'size', size)
        this.$set(this.queryData, 'size', size)
        if (this.currentPage === 1) {
          this.query()
        }
      },
      // 表格的查询方法
      query () {
        this.loading = true
        let url = this.gridOption.url
        // 分页参数
        let pageKey = this.gridOption.pageKey
        let pageSizeKey = this.gridOption.pageSizeKey
        let param = {[pageKey]: this.gridOption.page, [pageSizeKey]: this.gridOption.pageSize, ...this.queryData}
        this.gridOption.page = param.page
        this.gridOption.size = param.size

        let ajaxOption = {
          baseURL: this.gridOption.baseURL,
          // baseURL: this.gridOption.baseURL,
          json: true
        }

        // before-query切面
        this.$emit('before-query', param)
        return this.$ajax.get(url, param, ajaxOption).then(res => {
          // data-ready切面
          this.$emit('data-ready', res)
          if (res && res.status === 200) {
            let result = res.result || []
            // 设置gridOption的total
            this.gridOption.total = result.total_count
            // 设置gridOption的data
            this.gridOption.data = result.data
            return res
          }
        }).catch(error => {
          this.gridOption.data = []
          console.log(error)
          this.gridOption.noDataText = `<h3 style="color: red;">数据获取异常</h3>`
          throw new Error(error)
        }).finally((res) => {
          this.loading = false
        })
      }
    }
  }
</script>

<style lang="scss">
  .table-wrapper {
    position: relative;
    .page-wrapper {
      margin: 10px;
    }
  }
</style>
