<template>
  <div class="nodata">
    <template v-if="isAbnormal">
      <!-- 异常图 -->
      <img src="@/assets/fail@2x.png" alt="">
      <p class="no-txt">访问页面失败！</p>
    </template>
    <template v-else>
      <!-- 空数据图 -->
      <img src="@/assets/nodata@2x.png" alt="">
      <p class="no-txt">{{txt}}</p>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HfNodata',
  data() {
    return {};
  },
  props: {
    txt: {
      type: String,
      required: false,
      default: '暂无内容'
    }
  },
  computed: {
    ...mapGetters('nodata/',[
      // 是否显示异常图
      'isAbnormal',
    ]),
  },
};
</script>

<style lang="scss">
.nodata {
  margin-top: 100px;
  text-align: center;
  font-size: 18px;
  color: #666;
  img {
    width: 140px;
  }
  .no-txt{
    margin-top: 24px;
    color: #999999;
    font-size: 16px;
  }
}
</style>
