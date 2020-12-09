import store from '@/store'

/**
 * 检查是否拥有权限
 * @param value 传递过来的权限编码
 * @returns true表示拥有权限，false表示没有拥有权限
 */
export default function checkPermission(value) {
  if (value && value.length > 0) {
    const pris = store.getters && store.getters.pris
    for(let i=0;i<pris.length;i++){
        if(pris[i] === '*all_pri'){
          return true;
        }
        if(pris[i] === value){
          return true;
        }
    }
    return false;
  } else {
    return true;
  }
}

