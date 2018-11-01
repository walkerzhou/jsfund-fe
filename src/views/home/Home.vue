<template>
  <div>
    <Card class="margin-bottom8">
      <Row>
        <Form :label-width="100"> 
          <Col span="6" class="padding-left8">
            <FormItem label="发行日期" class="form-item">
              <DatePicker
                class="form-value"
                type="daterange"
                :value="[queryData.begin_pub_date, queryData.end_pub_date]"
                :options="options" 
                @on-change="changePubDate"
                placeholder="">
              </DatePicker>
            </FormItem>
          </Col>
          <Col span="6" class="padding-left8">
            <FormItem label="债券品种" class="form-item">
              <Select v-model="queryData.bond_type" placeholder="" clearable filterable class="form-value">
                <Option :value="bondType" v-for="bondType in bondTypeList" :key="bondType">{{bondType}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6" class="padding-left8">
            <FormItem label="发行期限" class="form-item">
              <InputNumber :max="100" :min="0" v-model="queryData.begin_bond_deadline" class="form-small-value"></InputNumber>
              至
              <InputNumber :max="100" :min="0" v-model="queryData.end_bond_deadline" class="form-small-value"></InputNumber>(单位：年)
            </FormItem>
          </Col>
          <Col span="6" class="padding-left8">
            <FormItem label="发行人" class="form-item">
              <AutoComplete clearable class="form-value" v-model="queryData.issuer" :data="issuerList" @on-search="findIssuers" @on-focus="findIssuers" @on-change="findIssuers" transfer>
                <Option v-for="issuer in issuerList" :value="issuer" :key="issuer">{{ issuer }}</Option>
              </AutoComplete>
              
            </FormItem>
          </Col>
        </Form>
      </Row>
      <Row>
        <Form :label-width="100"> 
          <Col span="6" class="padding-left8">
            <FormItem label="起息日期" class="form-item">
              <DatePicker
                class="form-value"
                type="daterange"
                :value="[queryData.begin_start_rate_date, queryData.end_start_rate_date]"
                :options="options"
                @on-change="changeStartRateDate"
                placeholder="">
              </DatePicker>
            </FormItem>
          </Col>
          <Col span="6" class="padding-left8">
            <FormItem label="债券评级" class="form-item">
              <Select v-model="queryData.credit_grade" placeholder="" clearable filterable class="form-value">
                <Option :value="grade" v-for="grade in gradeList" :key="grade">{{grade}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6" class="padding-left8">
            <FormItem label="主体评级" class="form-item">
              <Select v-model="queryData.main_credit_grade" placeholder="" clearable filterable class="form-value">
                <Option :value="grade" v-for="grade in gradeList" :key="grade">{{grade}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6" class="padding-left8">
            <FormItem label="" class="form-item">
              <Button type="error" @click="buttonGoSearch">搜索</Button>
              <Button type="primary" @click="clearData">清空</Button>
            </FormItem>
          </Col>
        </Form>
      </Row>
    </Card>
    <Page :route-name="_routeName">
      <Grid ref="grid" :grid-option="gridOption" :query-data="queryData"></Grid>
    </Page>


   <!--  <Modals :options="DetailModalOpt">
      <Detail slot="content" ref="Detail" :data="DetailModalData" :close="doDetailClose" v-if="detailDataReady"></Detail>
      <div slot="footer">
        <Button type="ghost" @click="$refs.Detail.onClose()">关闭</Button>
      </div>
    </Modals> -->

    <Modals :options="DetailBasicModalOpt">
      <DetailBasic slot="content" ref="DetailBasic" :data="DetailBasicModalData" :close="doDetailBasicClose" v-if="detailBasicDataReady"></DetailBasic>
      <div slot="footer">
        <Button type="ghost" @click="$refs.DetailBasic.onClose()">关闭</Button>
      </div>
    </Modals>

    <Modals :options="DetailFileListModalOpt">
      <DetailFileList slot="content" ref="DetailFileList" :data="DetailFileListModalData" :close="doDetailFileListClose" v-if="detailFileListDataReady"></DetailFileList>
      <div slot="footer">
        <Button type="ghost" @click="$refs.DetailFileList.onClose()">关闭</Button>
      </div>
    </Modals>

  </div>
</template>
<script>
import { PAGE_SIZE, BASE_URL, URLS } from '../../util/constant'
import pageMixin from '@views/page_mixin.js'
import Detail from './Detail.vue'
import DetailBasic from './DetailBasic.vue'
import DetailFileList from './DetailFileList.vue'
import util from '../../util/common'

export default {
  mixins: [pageMixin],
  data() {
    return {
      download_link: BASE_URL,
      dataReady: false,
      // 表格查询条件
      queryData: {
        page: 1,
        size: PAGE_SIZE,
        bond_type: '',
        begin_pub_date: '',
        end_pub_date: '',
        begin_start_rate_date: '',
        end_start_rate_date: '',
        begin_bond_deadline: null,
        end_bond_deadline: null,
        issuer: '',
        credit_grade: '',
        main_credit_grade: ''
      },
      bondTypeList: [
        '全部',
        '短期融资券',
        '中期票据',
        '公司债券',
        '超短期融资券',
        '金融债券',
        '企业债券',
        '二级资本债券',
        '集合债券',
        '非公开定向债务融资工具',
        '集合票据',
        '项目收益债券'
      ],
      gradeList: [
        '全部',
        'AAA',
        'AA+',
        'AA',
        'AA-',
        'A+',
        'A',
        'A-',
        'A-1',
        'A-2',
        'BBB+',
        'BBB',
        'BB+',
        'BB',
        'B+',
        'B',
        'B-',
        'CCC',
        'CC',
        'C'
      ],
      issuerList: [],
      // 表格字段配置
      gridOption: {
        url: URLS['QUERY_BOND_LIST'],
        columns: [
          {
            title: '债券名称',
            align: 'center',
            key: 'bond'
          },
          {
            title: '发行人',
            align: 'center',
            width: 180,
            key: 'issuer'
          },
          {
            title: '发行日期',
            align: 'center',
            width: 90,
            render: (h, params) => {
              let row = params['row']
              if (row.pubDate === null || row.pubDate === '') {
                return ''
              }
              return h('p', util.getDateFormat(row.pubDate))
            }
          },
          {
            title: '发行量(亿元)',
            align: 'center',
            width: 90,
            key: 'planMoney'
          },
          {
            title: '债券品种',
            align: 'center',
            width: 110,
            key: 'bondType'
          },
          {
            title: '债券期限',
            align: 'center',
            width: 70,
            key: 'bondDeadline'
          },
          {
            title: '起息日期',
            align: 'center',
            width: 90,
            render: (h, params) => {
              let row = params['row']
              if (row.startRateDate === null || row.startRateDate === '') {
                return ''
              }
              return h('p', util.getDateFormat(row.startRateDate))
            }
          },
          {
            title: '债券信用评级',
            align: 'center',
            width: 100,
            key: 'creditGrade'
          },
          {
            title: '主体信用评级',
            align: 'center',
            width: 100,
            key: 'mainCreditGrade'
          },
          {
            title: '操作',
            align: 'center',
            width: 230,
            render: (h, params) => {
              let row = params['row']

              // var lookDetail = h(
              //   'Button',
              //   {
              //     props: {
              //       type: 'error',
              //       size: 'small'
              //     },
              //     style: {
              //       marginRight: '5px'
              //     },
              //     on: {
              //       click: () => {
              //         this.goDetail(row)
              //       }
              //     }
              //   },
              //   '详细'
              // )

              var lookDetailBasic = h(
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
                      this.goDetailBasic(row)
                    }
                  }
                },
                '基本信息'
              )

              var lookDetailFileList = h(
                'Button',
                {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.goDetailFileList(row)
                    }
                  }
                },
                '相关文件'
              )

              var lookSearch = h(
                'Button',
                {
                  props: {
                    type: 'success',
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

              return h('div', [lookDetailBasic, lookDetailFileList, lookSearch])
            }
          }
        ]
      },
      detailDataReady: false,
      DetailModalOpt: {
        title: 'Tigerobo|搜国债',
        isShow: false,
        width: 800
      },
      detailBasicDataReady: false,
      DetailBasicModalOpt: {
        title: 'Tigerobo|搜国债',
        isShow: false,
        width: 900
      },
      detailFileListDataReady: false,
      DetailFileListModalOpt: {
        title: 'Tigerobo|搜国债',
        isShow: false,
        width: 900
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
      this.queryData.bond_type = ''
      this.queryData.begin_pub_date = ''
      this.queryData.end_pub_date = ''
      this.queryData.begin_start_rate_date = ''
      this.queryData.end_start_rate_date = ''
      this.queryData.begin_bond_deadline = null
      this.queryData.end_bond_deadline = null
      this.queryData.issuer = ''
      this.queryData.credit_grade = ''
      this.queryData.main_credit_grade = ''
      this.goSearch()
    },
    goDetail (row) {
      this.DetailModalOpt.isShow = true
      this.DetailModalOpt.title = row.bondName
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
    goDetailBasic (row) {
      this.DetailBasicModalOpt.isShow = true
      this.DetailBasicModalOpt.title = row.bond + ' - 基本信息'
      this.detailBasicDataReady = true
      this.DetailBasicModalData = {
        method: 'post',
        data: row
      }
    },
    doDetailBasicClose () {
      this.DetailBasicModalOpt.isShow = false
      this.detailBasicDataReady = false
    },
    goDetailFileList (row) {
      this.DetailFileListModalOpt.isShow = true
      this.DetailFileListModalOpt.title = row.bond + ' - 相关公告'
      this.detailFileListDataReady = true
      this.DetailFileListModalData = {
        method: 'post',
        data: row
      }
    },
    doDetailFileListClose () {
      this.DetailFileListModalOpt.isShow = false
      this.detailFileListDataReady = false
    },
    goMMSearch (row) {
      window.open('https://wx.tigerobo.com/dans1ecieldrag0n.html?query=' + row.code)
    },
    changePubDate (data) {
      this.queryData.begin_pub_date = data[0]
      this.queryData.end_pub_date = data[1]
    },
    changeStartRateDate (data) {
      this.queryData.begin_start_rate_date = data[0]
      this.queryData.end_start_rate_date = data[1]
    },
    changeEndRateDate (data) {
      this.queryData.begin_end_rate_date = data[0]
      this.queryData.end_end_rate_date = data[1]
    },
    findIssuers (query) {
      this.loadingIssuers = true
      var _this = this
      _this.$ajax['get'](URLS['FIND_ISSUER_LIST'] + '?key=' + query)
      .then(res => {
        if (res.status === 200) {
          _this.issuerList = res.result
        }
      })
    }
  },
  components: {
    Detail,
    DetailBasic,
    DetailFileList
  }
}
</script>
<style>
  .form-value {
    width:180px;
  }

  .form-small-value {
    width:80px;
  }
  
  .form-item {
    margin: 5px 0px;
  }

</style>
