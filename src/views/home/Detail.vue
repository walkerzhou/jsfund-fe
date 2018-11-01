<template>
  <div>
    <Card>
      <p slot="title">
        <Icon type="ios-film-outline"></Icon>
          债券基本资料
      </p>

      <p>
        <Row>
          <Col span="4" class="lable">债券简称:</Col>
          <Col span="8" class="value">{{data.data.bondName || '-'}}</Col>
          <Col span="4" class="lable">债券代码:</Col>
          <Col span="8" class="value">{{data.data.code || '-'}}</Col>
        </Row>
        <Row>
          <Col span="4" class="lable">发行人:</Col>
          <Col span="8" class="value">{{data.data.issuer || '-'}}</Col>
          <Col span="4" class="lable">发行日期:</Col>
          <Col span="8" class="value">{{data.data.pubDate || '-'}}</Col>
        </Row>
        <Row>
          <Col span="4" class="lable">计划发行量:</Col>
          <Col span="8" class="value">{{data.data.planMoney || '-'}}</Col>
          <Col span="4" class="lable">实际发行量:</Col>
          <Col span="8" class="value">{{data.data.actulMoney || '-'}}</Col>
        </Row>
        <Row>
          <Col span="4" class="lable">付息方式:</Col>
          <Col span="8" class="value">{{data.data.payMethod || '-'}}</Col>
          <Col span="4" class="lable">付息频率:</Col>
          <Col span="8" class="value">{{data.data.payFrequence || '-'}}</Col>
        </Row>
        <Row>
          <Col span="4" class="lable">票面利率:</Col>
          <Col span="8" class="value">{{data.data.rate || '-'}}</Col>
          <Col span="4" class="lable">基本利差:</Col>
          <Col span="8" class="value">{{data.data.baseRateDiff || '-'}}</Col>
        </Row>
        <Row>
          <Col span="4" class="lable">当期基础利率:</Col>
          <Col span="8" class="value">{{data.data.baseRate || '-'}}</Col>
          <Col span="4" class="lable">首次划款日:</Col>
          <Col span="8" class="value">{{data.data.firstDate || '-'}}</Col>
        </Row>
        <Row>
          <Col span="4" class="lable">起息日:</Col>
          <Col span="8" class="value">{{data.data.startRateDate || '-'}}</Col>
          <Col span="4" class="lable">到期日:</Col>
          <Col span="8" class="value">{{data.data.endRateDate || '-'}}</Col>
        </Row>
        <Row>
          <Col span="4" class="lable">上市流通日:</Col>
          <Col span="8" class="value">{{data.data.circulateDate || '-'}}</Col>
          <Col span="4" class="lable">发行手续费率:</Col>
          <Col span="8" class="value">{{data.data.pubCharge || '-'}}</Col>
        </Row>
        <Row>
          <Col span="4" class="lable">兑换手续费率:</Col>
          <Col span="8" class="value">{{data.data.cashCharge || '-'}}</Col>
          <Col span="4" class="lable">发行价格:</Col>
          <Col span="8" class="value">{{data.data.pubPrice || '-'}}</Col>
        </Row>
        <Row>
          <Col span="4" class="lable">参考收益率:</Col>
          <Col span="8" class="value">{{data.data.referEarnRate || '-'}}</Col>
          <Col span="4" class="lable">选择权类别:</Col>
          <Col span="8" class="value">{{data.data.selectType || '-'}}</Col>
        </Row>
        <Row>
          <Col span="4" class="lable">下一次赎回日:</Col>
          <Col span="8" class="value">{{data.data.nextRedDate || '-'}}</Col>
          <Col span="4" class="lable">债券期限:</Col>
          <Col span="8" class="value">{{data.data.bondDeadline || '-'}}</Col>
        </Row>
        <Row>
          <Col span="4" class="lable">ISSI码:</Col>
          <Col span="8" class="value">{{data.data.insiCode || '-'}}</Col>
          <Col span="4" class="lable">债券信用评级:</Col>
          <Col span="8" class="value">{{data.data.creditGrade || '-'}}</Col>
        </Row>
        <Row>
          <Col span="4" class="lable">评价机构:</Col>
          <Col span="8" class="value">{{data.data.evalUnit || '-'}}</Col>
          <Col span="4" class="lable">主体信用评级:</Col>
          <Col span="8" class="value">{{data.data.mainCreditGrade || '-'}}</Col>
        </Row>
        <Row>
          <Col span="4" class="lable">主体评级机构:</Col>
          <Col span="8" class="value">{{data.data.mainEvalUnit || '-'}}</Col>
          <Col span="4" class="lable">浮动利率基准:</Col>
          <Col span="8" class="value">{{data.data.floatRate || '-'}}</Col>
        </Row>
        <Row>
          <Col span="4" class="lable">剩余本金值:</Col>
          <Col span="8" class="value">{{data.data.remainPrice || '-'}}</Col>
          <Col span="4" class="lable">发型开始日:</Col>
          <Col span="8" class="value">{{data.data.startPubDate || '-'}}</Col>
        </Row>
        <Row>
          <Col span="4" class="lable">发行截止日:</Col>
          <Col span="8" class="value">{{data.data.endPubDate || '-'}}</Col>
          <Col span="4" class="lable">债券品种:</Col>
          <Col span="8" class="value">{{data.data.bondType || '-'}}</Col>
        </Row>
        <Row>
          <Col span="4" class="lable">流通场所:</Col>
          <Col span="8" class="value">{{data.data.place || '-'}}</Col>
          <Col span="4" class="lable">首次发行范围:</Col>
          <Col span="8" class="value">{{data.data.rang || '-'}}</Col>
        </Row>
         <Row>
          <Col span="4" class="lable">本息状态:</Col>
          <Col span="8" class="value">{{data.data.status || '-'}}</Col>
        </Row>
      </p>
    </Card>

    <Card style="margin-top: 30px;">
      <p slot="title">
        <Icon type="ios-folder-outline"></Icon>
          债券相关文件
      </p>
      <Grid ref="grid" :grid-option="gridOption" :query-data="queryData"></Grid>
    </Card>

  </div>
</template>
<script>
  import { URLS } from '../../util/constant'
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
          json: true
        },
        // 表格字段配置
        gridOption: {
          noNeedPage: true,
          columns: [
            {
              title: '类型',
              align: 'center',
              width: 120,
              key: 'type'
            },
            {
              title: '标题',
              align: 'center',
              key: 'title'
            },
            {
              title: '日期',
              align: 'center',
              width: 120,
              render: (h, params) => {
                let row = params['row']
                return h('p', util.getDateFormat(row.publishTime))
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
  .value {
    color:blue;
  }
</style>
