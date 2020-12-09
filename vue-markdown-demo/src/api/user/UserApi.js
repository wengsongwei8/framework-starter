import request from '@/common/utils/request'
import { setPageParams } from '@/common/utils/common'

export  function fetchOptions(param) {
  return request({
    url: '/auth/user/select-option',
    method: 'get',
    params: param
  })
}

export  function fetchListByUserType(param) {
  param = setPageParams(param)
  return request({
    url: '/auth/user/list-by-usertype',
    method: 'get',
    params: param
  })
}

export  function fetchList(param) {
  param = setPageParams(param)
  return request({
    url: '/auth/user/list',
    method: 'get',
    params: param
  })
}

export function createUser(data) {
  return request({
    url: '/auth/user/add',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/auth/user/update',
    method: 'post',
    data
  })
}
export function delUser(data) {
  return request({
    url: '/auth/user/delete',
    method: 'post',
    data
  })
}

export function getUserById(id) {
  return request({
    url: '/auth/user/get?id='+id,
    method: 'get'
  })
}
