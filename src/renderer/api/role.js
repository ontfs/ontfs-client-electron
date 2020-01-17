import request from './request'

export function CommonFn(data) {
  return request({
    method: 'post',
    data
  })
}
