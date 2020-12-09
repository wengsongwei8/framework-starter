import commonDatas from '@/common/commonData'

// 题目类型
export function formatExercisesTypes(val) {

  const exercisesTypes = commonDatas.exercisesTypes;
  let text = '未知';
  for (let i = 0, len = exercisesTypes.length;i< len; i ++){
    const typeObj = exercisesTypes[i];
    if (typeObj.value === val){
      return typeObj.label;
    }
  }
  return text;
}

// 格式化课时类型
export function formatChapterTypes(val) {
  return formatCommon(val, commonDatas.chapterTypes);
}

// 格式化课程类型
export function formatLessonTypes(val) {
  return formatCommon(val, commonDatas.lessonTypes);
}

// 格式化计划
export function formatPlanStatus(val) {
  return formatCommon(val, commonDatas.planStatus);
}

// 用户类型
export function formatUserTypes(val) {

  const types = commonDatas.USER_TYPES;
  let text = '未知';
  for (let i = 0, len = types.length;i< len; i ++){
    const typeObj = types[i];
    if (typeObj.value === val){
      return typeObj.label;
    }
  }
  return text;
}

// 性别格式化
export function formatSex(val) {

  const types = commonDatas.SEXS;
  let text = '未知';
  for (let i = 0, len = types.length;i< len; i ++){
    const typeObj = types[i];
    if (typeObj.value === val){
      return typeObj.label;
    }
  }
  return text;
}

// 格式化是和否
export function formatIsOrNot(val) {
  let text = '否';
  const resourceStatus = commonDatas.isOrNotOptions;
  for (let i = 0, len = resourceStatus.length;i< len; i ++){
    const typeObj = resourceStatus[i];
    if (typeObj.value === val){
      return typeObj.label;
    }
  }
  return text;
}



// 上架状态
export function formatPublishStatus(val) {

  const fileTypes = commonDatas.publishStatus;
  let text = '未知';
  for (let i = 0, len = fileTypes.length;i< len; i ++){
    const typeObj = fileTypes[i];
    if (typeObj.value === val){
      return typeObj.label;
    }
  }
  return text;
}

// 推荐状态
export function formatRecommandStatus(val) {

  const fileTypes = commonDatas.recommandStatus;
  let text = '未知';
  for (let i = 0, len = fileTypes.length;i< len; i ++){
    const typeObj = fileTypes[i];
    if (typeObj.value === val){
      return typeObj.label;
    }
  }
  return text;
}

// 通用的格式化方法
export function formatCommon(val,valueList) {
  let text = '未知';
  for (let i = 0, len = valueList.length;i< len; i ++){
    const typeObj = valueList[i];
    if (typeObj.value === val){
      return typeObj.label;
    }
  }
  return text;

}

export function formatDate(time){
  var date=new Date(time);
  var year=date.getFullYear();
  /* 在日期格式中，月份是从0开始的，因此要加0
   * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
   * */
  var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
  var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
  var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
  var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
  var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
  // 拼接
  return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
}
