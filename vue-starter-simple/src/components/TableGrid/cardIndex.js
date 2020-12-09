import Constants from '@/common/config/config.js'
import cardList from './cardList.vue'

export default {
  name: 'TableGrid',
  componentName: 'TableGrid',
  components: {
    cardList,
  },
  props: {
     // 图片所在列图性
     imgColumn: {
      type: String,
      default: ''
    },
    // 标题所在列
    infoColumn:{
      type: String,
      default: ''
    },
    // 副标题所在列
    subInfoColumn:{
      type: String,
      default: ''
    },
    // 图中提示所在列
    iconTitTopColumn:{
      type: String,
      default: ''
    },
    // 提示所在列
    iconTitColumn:{
      type: String,
      default: ''
    },

    total: {
      type: Number,
      default: 0
    },

    queryList: Function,
    columns: {
      type: Array,
      default: []
    },
    pageSizes: {
      type: Array,
      default: () => Constants.DEFAULT_PAGES_ARRAY
    },
    paginationAlign: {
      type: String,
      default: 'center'
    },
    hasPagination: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: []
    },

    loading: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'mini' // 列表的大小，有 medium / small / mini
    },
    stripe: {
      type: Boolean,
      default: true // 是否为斑马纹 table
    },
    border: {
      type: Boolean,
      default: true // 是否带有纵向边框
    },
    showHeader: {
      type: Boolean,
      default: true // 是否显示表头
    },
    highlightCurrentRow: {
      type: Boolean,
      default: false // 是否要高亮当前行
    },

    // cardList配置
    isView: {
      type: Boolean,
      default: false,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    isDel: {
      type: Boolean,
      default: false,
    },
    isCustom1: {
      type: Boolean,
      default: false,
    },
    isCustom1: {
      type: Boolean,
      default: false,
    },
    isCustom2: {
      type: Boolean,
      default: false,
    },
    customFunText1: {
      type: String,
      default: "",
    },
    customFunText2: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      currentPage: 1,
      pageSize: Constants.DEFAULT_PAGE_NUM
    };
  },
  methods: {

    viewFun(item) {
      this.$emit('view', item);
    },
    editFun(item) {
      this.$emit('edit', item);
    },
    delFun(item) {
      this.$emit('del', item);
    },
    customFun1(item) {
      this.$emit('customFun1', item);
    },
    customFun2(item) {
      this.$emit('customFun2', item);
    },

    search() {
      this.handleCurrentChange(1);
    },
    sizeChange(size) {
      this.pageSize = size;
      this.queryList(1, this.pageSize);
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.queryList(this.currentPage, this.pageSize);
    }
  },
  render(h) {
    const namespace = 'table-grid';


    return (
      <div class={namespace}>

        <card-List list={this.data} imgColumn={this.imgColumn} infoColumn={this.infoColumn}
          subInfoColumn={this.subInfoColumn} iconTitTopColumn={this.iconTitTopColumn}
          iconTitColumn={this.iconTitColumn} isCustom2={this.isCustom2}
          isView={this.isView} isEdit={this.isEdit} isDel={this.isDel}
          customFunText1={this.customFunText1} customFunText2={this.customFunText2}
          on-edit = {this.editFun} on-view = {this.viewFun} on-del = {this.delFun}
          isCustom1={this.isCustom1}  customFunText1 = {this.customFunText1}   on-customFun1 = {this.customFun1}
          isCustom2={this.isCustom2}  customFunText2 = {this.customFunText2}   on-customFun2 = {this.customFun2}
        >
        </card-List>
        {
          this.hasPagination &&
          <el-pagination class={`el-pagination--${this.paginationAlign}`}
            current-page={this.currentPage} page-size={this.pageSize} page-sizes={ this.pageSizes}
            total={this.total} on-current-change={this.handleCurrentChange} on-size-change={this.sizeChange}
            layout="total, sizes, prev, pager, next, jumper">
          </el-pagination>
        }
      </div>
    );
  }
};
