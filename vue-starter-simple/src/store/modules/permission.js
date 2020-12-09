import {customRouterMap, constantRouterMap} from '@/router'
/**
 * 通过meta.priCode 判断是否与当前用户权限匹配
 * @param pris
 * @param route
 */
function hasPermission(pris, route) {
  if (pris && route.meta && route.meta.priCode != undefined && route.meta.priCode != '') {
    for(let i=0;i<pris.length;i++){
        if(pris[i] === route.meta.priCode){
          return true;
        }
    }

    return false;
  } else { // 如果路由不设置权限编码，则默认拥有权限
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户权限的路由表
 * @param asyncRouterMap
 * @param pris
 */
function filterAsyncRouter(asyncRouterMap, pris) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(pris, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, pris);
        if (route.children.length === 0){
          return false;
        }
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { pris } = data
        let isAll = false;
        for(let index in pris){
            if(pris[index] === '*all_pri'){
              isAll = true;
            }
        }
        let accessedRouters = customRouterMap;
        if(!isAll){
          accessedRouters = filterAsyncRouter(customRouterMap, pris);
        }

        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
