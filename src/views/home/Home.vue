<template>
  <div>
    <Card class="margin-bottom8">
      <Row>
        <Col span="3" class="padding-left8">
          <Input v-model="queryData.key" placeholder="债券代码/简称"></Input>
        </Col>
        <Col span="3" class="padding-left8">
          <Select v-model="queryData.bond_type" placeholder="债券品种" clearable filterable>
            <Option :value="bondType" v-for="bondType in bondTypeList" :key="bondType">{{bondType}}</Option>

          </Select>
        </Col>
         <Col span="4" class="padding-left8">
          <Select v-model="queryData.pay_interest_type" placeholder="付息方式"  clearable filterable>
            <Option :value="payInterestType" v-for="payInterestType in payInterestTypeList" :key="payInterestType">{{payInterestType}}</Option>
          </Select>
        </Col>
        <Col span="3" class="padding-left8">
          <Select v-model="queryData.year" placeholder="发行年份" clearable filterable>
            <Option :value="year" v-for="year in yearList" :key="year">{{year}}</Option>
          </Select>
        </Col>
        <Col span="4" class="padding-left8">
          <Button type="primary" @click="buttonGoSearch">搜索</Button>
          <Button type="ghost" @click="clearData">清空</Button>
        </Col>
      </Row>
    </Card>
    <Page :route-name="_routeName">
      <Grid ref="grid" :grid-option="gridOption" :query-data="queryData"></Grid>
    </Page>


    <Modals :options="DetailModalOpt">
      <Detail slot="content" ref="Detail" :data="DetailModalData" :close="doDetailClose" v-if="detailDataReady"></Detail>
      <div slot="footer">
        <Button type="ghost" @click="$refs.Detail.onClose()">关闭</Button>
      </div>
    </Modals>


  </div>
</template>
<script>
import { PAGE_SIZE, BASE_URL, URLS } from '../../util/constant'
import pageMixin from '@views/page_mixin.js'
import Detail from './Detail.vue'

export default {
  mixins: [pageMixin],
  data() {
    return {
      download_link: BASE_URL,
      dataReady: false,
      detailDataReady: false,
      // 表格查询条件
      queryData: {
        page: 1,
        size: PAGE_SIZE,
        key: '',
        bond_type: '',
        pay_interest_type: '',
        year: ''
      },
      bondTypeList: [
        '全部',
        '记账式国债',
        '央行票据',
        '政策性银行债券',
        '商业银行债券',
        '中央企业债',
        '非银行金融机构债',
        '地方政府债',
        '特种金融债',
        '地方企业债',
        '资产支持证券',
        '中期票据',
        '其它债券',
        '证券公司债',
        '证券公司短期融资券',
        '短期融资券',
        '储蓄国债',
        '国际机构债券',
        '凭证式国债',
        '集合企业债',
        '集合票据',
        '政府支持机构债',
        '超短期融资券',
        '公司债券',
        '政府支持债券',
        '中小非金融企业集合票据',
        '中小企业私募债券',
        '非公开定向债务融资工具',
        '非金融企业资产支持票据',
        '保险公司次级债',
        '资产管理公司金融债',
        '分离式可转债',
        '其他一级资本工具',
        '二级资本工具',
        '同业存单',
        '交易所资产支持证券',
        '项目收益票据',
        '理财直接融资工具',
        '证券公司次级债',
        '保险公司金融债',
        '项目收益债券',
        '外国主权政府债券',
        '扶贫专项金融债'
      ],
      payInterestTypeList: [
        '全部',
        '无计息方式',
        '贴现',
        '利随本清',
        '附息式固定利率',
        '附息式浮动利率',
        '零息式'
      ],
      yearList: [
        '2019',
        '2018',
        '2017',
        '2016',
        '2015',
        '2014',
        '2013',
        '2012',
        '2011',
        '2010',
        '2009',
        '2008',
        '2007',
        '2006',
        '2005',
        '2004',
        '2003',
        '2002',
        '2001',
        '2000',
        '1999',
        '1998'
      ],
      // 表格字段配置
      gridOption: {
        url: URLS['QUERY_BOND_LIST'],
        columns: [
          {
            title: '债券简称',
            align: 'center',
            width: 120,
            key: 'bondName'
          },
          {
            title: '债券代码',
            align: 'center',
            width: 80,
            key: 'code'
          },
          {
            title: '发行人',
            align: 'center',
            key: 'issuer'
          },
          {
            title: '发行日期',
            align: 'center',
            width: 90,
            key: 'pubDate'
          },
          {
            title: '发行量(亿元)',
            align: 'center',
            width: 90,
            key: 'actulMoney'
          },
          {
            title: '付息方式',
            align: 'center',
            width: 120,
            key: 'payMethod'
          },
          {
            title: '票面利率',
            align: 'center',
            width: 70,
            key: 'rate'
          },
          {
            title: '债券期限',
            align: 'center',
            width: 70,
            key: 'bondDeadline'
          },
          {
            title: '起息日',
            align: 'center',
            width: 90,
            key: 'startRateDate'
          },
          {
            title: '到期日',
            align: 'center',
            width: 90,
            key: 'endRateDate'
          },
          {
            title: '债券信用评级',
            align: 'center',
            width: 100,
            key: 'creditGrade'
          },
          {
            title: '操作',
            align: 'center',
            width: 180,
            render: (h, params) => {
              let row = params['row']

              var lookDetail = h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.goDetail(row)
                    }
                  }
                },
                '查看详细'
              )

              var lookSearch = h(
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
                      this.goMMSearch(row)
                    }
                  }
                },
                '智能搜索'
              )

              return h('div', [lookDetail, lookSearch])
            }
          }
        ]
      },

      DetailModalOpt: {
        title: 'Tigerobo|搜国债',
        isShow: false,
        width: 600
      },
      options: {}
    }
  },
  methods: {
    buttonGoSearch () {
      this.queryData.page = 1
      this.goSearch()
    },
    goSearch() {
      this.$refs.grid.query()
    },
    clearData() {
      this.queryData.page = 1
      this.queryData.size = PAGE_SIZE
      this.queryData.key = ''
      this.queryData.bond_type = ''
      this.queryData.pay_interest_type = ''
      this.queryData.year = ''
      this.goSearch()
    },
    goDetail (row) {
      this.DetailModalOpt.isShow = true
      this.detailDataReady = true
      this.DetailModalData = {
        method: 'post',
        data: row
      }
    },
    doDetailClose () {
      this.DetailModalOpt.isShow = false
      this.detailDataReady = false
    },
    goMMSearch (row) {
    }
  },
  components: {
    Detail
  }
}
</script>
<style>

</style>
