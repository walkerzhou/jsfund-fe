<template>
  <div>
     <Card>
      <p>
        <Row>
          <Col span="4" class="lable">债券简称:</Col>
          <Col span="8" class="value">{{data.data.bondName || '-'}}</Col>
          <Col span="4" class="lable">发行日期:</Col>
          <Col span="8" class="value">{{data.data.pubDate || '-'}}</Col>
        </Row>
        <Row>
          <Col span="4" class="lable">债券期限:</Col>
          <Col span="8" class="value">{{data.data.bondDeadline || '-'}}</Col>
          <Col span="4" class="lable">首次划款日:</Col>
          <Col span="8" class="value">{{data.data.firstDate || '-'}}</Col>
        </Row>
        <Row>
          <Col span="4" class="lable">计划发行量:</Col>
          <Col span="8" class="value" v-if="data.data.planMoney">{{data.data.planMoney || '-'}}亿</Col>
          <Col span="8" class="value" v-if="!data.data.planMoney">-</Col>
          <Col span="4" class="lable">注册资金:</Col>
          <Col span="8" class="value" v-if="data.data.registerMoney">{{data.data.registerMoney || '-'}}亿</Col>
          <Col span="8" class="value" v-if="!data.data.registerMoney">-</Col>
        </Row>
        <Row>
          <Col span="4" class="lable">起息日期:</Col>
          <Col span="8" class="value">{{data.data.startRateDate || '-'}}</Col>
          <Col span="4" class="lable">债券期限:</Col>
          <Col span="8" class="value">{{data.data.bondDeadline || '-'}}</Col>
        </Row>
        </Row>
          <Col span="4" class="lable">发行人:</Col>
          <Col span="8" class="value">{{data.data.issuer || '-'}}</Col>
          <Col span="4" class="lable">债券品种:</Col>
          <Col span="8" class="value">{{data.data.bondType || '-'}}</Col>
        </Row>

        <Row>
          <Col span="4" class="lable">首次发行价格:</Col>
          <Col span="8" class="value">{{data.data.pubPrice || '-'}}</Col>
          <Col span="4" class="lable">币种:</Col>
          <Col span="8" class="value">人民币</Col>
        </Row>

        <Row>
          <Col span="4" class="lable">上市流通日:</Col>
          <Col span="8" class="value">{{data.data.circulateRate || '-'}}</Col>
          <Col span="4" class="lable">评级机构:</Col>
          <Col span="8" class="value">{{data.data.evalUnit || '-'}}</Col>
        </Row>
        <Row>
          <Col span="4" class="lable">债券信用评级:</Col>
          <Col span="8" class="value">{{data.data.creditGrade || '-'}}</Col>
          <Col span="4" class="lable">主体信用评级:</Col>
          <Col span="8" class="value">{{data.data.mainCreditGrade|| '-'}}</Col>
        </Row>
      </p>
    </Card>

  </div>
</template>
<script>
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
        dataReady: false
      }
    },
    created () {
      if (this.data.data.pubDate) {
        this.data.data.pubDate = util.getDateFormat(this.data.data.pubDate)
      }
      if (this.data.data.startRateDate) {
        this.data.data.startRateDate = util.getDateFormat(this.data.data.startRateDate)
      }
      if (this.data.data.firstDate) {
        this.data.data.firstDate = util.getDateFormat(this.data.data.firstDate)
      }
      if (this.data.data.circulateRate) {
        this.data.data.circulateRate = util.getDateFormat(this.data.data.circulateRate)
      }
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
    color: blue;
    line-height: 30px;
  }
</style>
