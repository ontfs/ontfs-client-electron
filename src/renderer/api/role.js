import request from './request'

export function StartSDK(data) {
  return request({
    method: 'post',
    data
  })
}
