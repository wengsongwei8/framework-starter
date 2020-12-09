<template>
  <div class="hyh-video-component__list">
    <!-- 列表 -->
    <div
      class="item"
      v-for="item in list"
      @click.prevent="toView(item)"
    >
      <div class="item-top">
        <!-- 是否移除 -->
        <!-- <i
          class="icon-move"
          @click.stop="moveVideo(item.collectionId)"
        >
          <hyh-icon
            href="icon-guanbi-xuanfu"
            size="12px"
            style="margin:-2px 2px 0 0"
          ></hyh-icon
          >移除
        </i> -->
        <!-- 状态 -->
        <i  class="icon-living"> {{ item[iconTitTopColumn] }}</i>
        <!-- 图 -->
        <img :src="`${item[`${imgColumn}`]}`" @error="imgUrlError" />
      </div>
      <!-- 信息 -->
      <div class="item-bottom">
        <div class="item-tit">
          <span>
            <i class="icon-tit" v-if="isShowItemTip(item)">{{
              item[iconTitColumn].substr(0, 1)
            }}</i>
          </span>
          {{ item[infoColumn] }}
          <div></div>
        </div>
        <div class="item-info">
          {{ item[subInfoColumn] }}
        </div>
        <div style="float:right;padding: 5px 10px 5px 5px;">
            <span  v-show="isCustom1" @click="customFun1(item)"  class="grid-edit-btn"><img :src="viewImg"/><span >{{customFunText1}}</span></span>
            <span  v-show="isCustom2" @click="customFun2(item)" class="grid-edit-btn"><img :src="viewImg"/><span  >{{customFunText2}}</span></span>
            <span  v-show="isView" @click="toView(item)" class="grid-edit-btn"><img :src="viewImg"/><span  >查看</span></span>
            <span  v-show="isEdit" @click="toEdit(item)" class="grid-edit-btn"><img :src="editImg"/><span  >编辑</span></span>
            <span  v-show="isDel" @click="toDel(item)" class="grid-edit-btn"><img :src="deleteImg"/><span  >删除</span></span>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * 图片列表分页组件
 */
import editImg from '@/assets/grid/edit.png'
import viewImg from '@/assets/grid/view.png'
import deleteImg from '@/assets/grid/delete.png'

export default {
  name: 'card-list',
  props: {
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
    // 列表
    list: {
      required: true,
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      editImg,
      deleteImg,
      viewImg,
    };
  },
  methods: {

    toView(item) {
      this.$emit('view', item);
    },
    toEdit(item) {
      this.$emit('edit', item);
    },
    toDel(item) {
      this.$emit('del', item);
    },
    customFun1(item) {
      this.$emit('customFun1', item);
    },
    customFun2(item) {
      this.$emit('customFun2', item);
    },


    isShowItemTip(item){
      return item[this.iconTitColumn];
    },
    // 图片地址出错
    imgUrlError(e) {
      // e.target.src = require('../../../assets/images/imgUrlError.png');
    }
  },
  mounted() {
    this.$nextTick(() => { });
  }
};
</script>
<style lang="scss">
  .hyh-video-component__list {
    .item {
      display: inline-block;
      width: 23%;
      margin-right: 24px;
      margin-bottom: 24px;
      border-radius: 5px;
      border: 1px solid rgba(236, 236, 236, 1);
      box-shadow: 0px 4px 13px 0px rgba(224, 224, 224, 0.6);
      overflow: hidden;
      &:nth-child(4n) {
        margin-right: 0;
      }
      &:hover .item-top .icon-move {
        display: inline-block;
      }
      .item-top {
        width: 100%;
        height: 160px;
        position: relative;
        img {
          width: 100%;
          height: 160px;
        }
        .icon-living {
          position: absolute;
          top: 4px;
          right: 4px;
          display: inline-block;
          width: 42px;
          height: 16px;
          border-radius: 3px;
          font-size: 10px;
          text-align: center;
          background-color: #dfb371;
          color: #ffffff;
          font-style: normal;
        }
        .icon-move {
          position: absolute;
          top: 4px;
          right: 4px;
          display: none;
          width: 50px;
          height: 20px;
          line-height: 20px;
          border-radius: 3px;
          font-size: 12px;
          text-align: center;
          background-color: #000000;
          color: #ffffff;
          font-style: normal;
          opacity: 0.5;
        }
      }
      .item-bottom {
        // width: inherit;
        height: 62px;
        .icon-tit {
          display: inline-block;
          width: 16px;
          height: 16px;
          margin-right: 5px;
          border-radius: 2px;
          border: 1px solid #edcba5;
          font-size: 12px;
          text-align: center;
          color: #b3732d;
          font-style: normal;
        }
        .item-tit {
          color: #333333;
          font-size: 16px;
          margin: 13px 16px 8px 16px;
        }
        .item-info {
          font-size: 12px;
          color: #999999;
          margin: 0 16px;
        }
        .item-tit,
        .item-info {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
</style>


