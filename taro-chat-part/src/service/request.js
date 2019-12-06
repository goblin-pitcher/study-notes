import Taro from '@tarojs/taro'
import {getType} from '@/common/tools'

function setDefaultOptions(options) {
  options.header = options.header || {
    'Content-type': 'application/json'
  }
  options.method = options.method||'GET'
  options.data = options.data || {}
}

export const request = (urlOrOption) => {
  const argType = getType(urlOrOption)
  if (!(['string', 'object'].includes(argType))) throw '第一个参数类型需为string或object'
  let method, url, data, header, options
  if (argType === 'object') {
    ({method, url, data, header} = urlOrOption)
    options = {method, url, data, header}
  } else {
    options = {url: urlOrOption}
  }
  setDefaultOptions(options)
  return new Promise((resolve, reject) => {
    Taro.request({
      ...options,
      success(res) {
        if(res.statusCode === 200){
          resolve(res.data)
        } else {
          reject({statusCode:res.statusCode, errMsg:res.errMsg})
        }
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
