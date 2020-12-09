<template>
  <div>
  <Editormd v-bind:content="content" ref="Editormd" type="editor"></Editormd>
  </div>

</template>

<script>
  import Editormd from '@/components/common/Editormd'

  import { mapGetters } from 'vuex'

  export default {
    name: 'dashboard-editor',
    data() {
      return {
        emptyGif: '',
        content: '',
      }
    },
    computed: {
      ...mapGetters([
        'name',
        'avatar',
        'roles'
      ])
    },
    components: {
      Editormd
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>


  .dashboard-editor-container {
    background-color: #e3e3e3;
    min-height: 100vh;
    padding: 50px 60px 0px;
    .pan-info-roles {
      font-size: 12px;
      font-weight: 700;
      color: #333;
      display: block;
    }
    .info-container {
      position: relative;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }
  }
</style>
