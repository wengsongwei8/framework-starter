/**
 * 公用数据集
 */
export default {

  // 习题类型
  exercisesTypes: [
    {value: 'SINGLE_CHOICE', label: '单选'},
    {value: 'MULTIPLE_CHOICE', label: '多选'},
    {value: 'JUDGE', label: '判断'},
    {value: 'GENERAL_GAP_FILLING', label: '填空'},
    {value: 'ESSAY', label: '应用'},
    {value: 'SYNTHESIS', label: '综合'}
  ],

  // 章节类型类型
  chapterTypes: [
    {value: '1', label: '章节'},
    {value: '2', label: '课程'},
  ],

  // 课程类型
  lessonTypes: [
    {value: '1', label: '视频'},
    {value: '2', label: '音频'},
    {value: '3', label: '图文'},
    {value: '4', label: '文档'},
    {value: '5', label: '试卷'},
  ],

  // 文件类型
  fileTypes: [
    {value: "doc", label: 'word文档'},
    {value: "excel", label: 'excel文档'},
    {value: "ppt", label: 'ppt文档'},
    {value: "pdf", label: 'pdf文档'},
    {value: "image", label: '图片'},
    {value: "video", label: '视频'},
    {value: "audio", label: '音频'},
    {value: "zip", label: '压缩文件'},
    {value: "flash", label: 'flash文件'},
    {value: "other", label: '其他'}
  ],

    // 课程类型
    planStatus: [
      {value: '0', label: '未进行'},
      {value: '1', label: '进行中'},
      {value: '2', label: '已结束'}
    ],


  isOrNotOptions: [
    {value: '0', label: '否'},
    {value: '1', label: '是'}
  ],

   // 推荐状态
 recommandStatus: [
  {value: 0, label: '不推荐'},
  {value: 1, label: '推荐'}
],

  // 上架状态
  publishStatus: [
    {value: 0, label: '下架'},
    {value: 1, label: '上架'}
  ],
  // 用户类型
  USER_TYPES: [
    {value: 1, label: '管理人员'},
    {value: 2, label: '教官'},
    {value: 3, label: '犯人'},
    {value: 4, label: '家属'},
    {value: 5, label: '律师'},
  ],
  SEXS: [
    {value: 1, label: '男'},
    {value: 2, label: '女'},
    {value: 0, label: '未知'}
  ],



}
