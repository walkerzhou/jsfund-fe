<template>
  <div>
    <template>
      <p>{{data.data.bondName}}</p>

      <p></p>
      <p>债券基本资料</p>
    </template>

    <template>
      <p>债券简称 {{data.data.bondName}}        债券代码 {{data.data.code}}</p>
      <p>发行人 {{data.data.issuer}}        发行日期 {{data.data.pubDate}}</p>
      <p>计划发行量 {{data.data.pplanMoney}}       实际发行量 {{data.data.actulMoney}}</p>
      <p>付息方式 {{data.data.payMethod}}       付息频率 {{data.data.payFrequence}}</p>
      <p>票面利率 {{data.data.rate}}        基本利差 {{data.data.baseRateDiff}}</p>
      <p>当期基础利率 {{data.data.baseRate}}        首次划款日 {{data.data.firstDate}}</p>
      <p>起息日 {{data.data.startRateDate}}        到期日 {{data.data.endRateDate}}</p>
      <p>上市流通日 {{data.data.circulateDate}}        发行手续费率 {{data.data.pubCharge}}</p>
      <p>兑换手续费率 {{data.data.cashCharge}}        发行价格 {{data.data.pubPrice}}</p>
      <p>参考收益率 {{data.data.referEarnRate}}        选择权类别 {{data.data.selectType}}</p>
      <p>下一次赎回日 {{data.data.nextRedDate}}        债券期限 {{data.data.bondDeadline}}</p>
      <p>ISSI码 {{data.data.insiCode}}        债券信用评级 {{data.data.creditGrade}}</p>
      <p>评价机构 {{data.data.evalUnit}}        主体信用评级 {{data.data.mainCreditGrade}}</p>
      <p>主体评级机构 {{data.data.mainEvalUnit}}        浮动利率基准 {{data.data.floatRate}}</p>
      <p>剩余本金值 {{data.data.remainPrice}}        发型开始日 {{data.data.startPubDate}}</p>
      <p>发行截止日 {{data.data.endPubDate}}        债券品种 {{data.data.bondType}}</p>
      <p>流通场所 {{data.data.place}}        首次发行范围 {{data.data.rang}}</p>
      <p>本息状态 {{data.data.status}}</p>
    </template>

    <Grid ref="grid" :grid-option="gridOption" :query-data="queryData"></Grid>

  </div>
</template>
<script>
  import { URLS, PIPELINE_BASE_URL } from '../../util/constant'
  import pageMixin from '@views/page_mixin.js'
  import util from '../../util/common'

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
        dataReady: false,
        // 表格查询条件
        queryData: {
        },
        ajaxOption: {
          baseURL: PIPELINE_BASE_URL,
          json: true
        },
        // 表格字段配置
        gridOption: {
          baseURL: PIPELINE_BASE_URL,
          noNeedPage: true,
          columns: [
            {
              title: '类型',
              align: 'center',
              width: 80,
              key: 'type'
            },
            {
              title: '标题',
              align: 'center',
              key: 'title'
            },
            {
              title: '路径',
              align: 'center',
              width: 80,
              key: 'path'
            },
            {
              title: '日期',
              align: 'center',
              width: 80,
              render: (h, params) => {
                let row = params['row']
                return h('p', util.getTimeFormat(row.publishTime))
              }
            }
          ]
        }
      }
    },
    created () {
      this.gridOption.url = URLS['DETAIL_QUERY'] + '?bond_code=' + this.data.data.code
    },
    methods: {
      onClose() {
        this.close && this.close()
      }
    },
    components: {

    }
  }
</script>

<style>
</style>
