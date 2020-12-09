<template>
  <span class="hyh-icon">
    <svg class="svg-icon" aria-hidden="true" v-if="symbol" :style="fontSize">
      <use :xlink:href="iconClass"></use>
    </svg>
    <span class="icon iconfont" :class="iconClass" v-else :style="fontSize"></span>
  </span>
</template>

<script>
  /**
   * 阿里iconfont图标
   * https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.11&manage_type=myprojects&projectId=985199
   */
  export default {
    name: 'HyhIcon',
    props: {
      // 普通图标
      href: {
        type: String,
        required: true,
      },
      // 是否为svg图标
      symbol: {
        type: Boolean,
        default: false,
      },
      // 图标大小
      size: {
        type: String,
        default: '',
      },
    },
    computed: {
      iconClass() {
        return this.symbol ? `#${this.href}` : `${this.href}`;
      },
      fontSize() {
        if (!this.size) {
          return '';
        }
        return { fontSize: this.size };
      },
    },
  };
</script>

<style lang="scss" scoped>
  .hyh-icon {
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
    .svg-icon {
      width: 1em;
      height: 1em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
      font-size: 16px;
    }
    /* 部分图标默认样式 */
    .icon-caozuozhengchang {
      font-size: 28px;
    }
    .icon-pinglun-zhengchang,
    .icon-dianzan-zhengchang1,
    .icon-xiangce {
      color: #999;
      &:hover {
        color: #666;
      }
    }
  }
</style>
