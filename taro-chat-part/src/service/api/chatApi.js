import {baseUrl, robotId} from '../config'
import {request} from '../request'

let Urls = {
  getRelatedKeys: '/getRelatedKeys',
  suggestion: `/${robotId}/mobile/business/suggestion`,
  search: `/${robotId}/mobile/business/search`,
  findById: `/${robotId}/mobile/business/findById`,
  getMedia: `/${robotId}/mediaConfig/getMedia`,
  setEvaluations: `/${robotId}/mobile/business/updateFeedbackBatchIds`
}
Object.keys(Urls).forEach(key => {
  Urls[key] = baseUrl + Urls[key]
})
/*
 获取相关搜索内容
 data:{searchKey:'xxx'}
 */
export const getRelatedKeys = data => request({
  method: 'POST',
  url: Urls.getRelatedKeys,
  data
})
/*
 获取相关搜索内容
 data:{suggestion:'xxx'}
 */
export const getSuggestion = data => request({
  url: Urls.suggestion,
  data
})
/*
 搜索相关答案
 data:{question:'xxx'}
 */
export const getSearch = data => request({
  url: Urls.search,
  data
})
/*
 搜索相关答案
 data:{id:'xxx'}
 */
export const findAnswerById = data => request({
  url: Urls.findById,
  data
})
/*
 搜索答案详情
 data:{refid:'xxx'}
 */
export const getMedia = data => request({
  url: Urls.getMedia,
  data
})
/*
 问题评价反馈
 data:{
    idList:JSON.stringify(['3015xxxxxxx','3016xxxxxxx']),
    usefulList: JSON.stringify([0,1])
    }
 */
export const setEvaluations = data => {
  let postData = {}
  Object.keys(data).map(item => {
    postData[item] = JSON.stringify(data[item])
  })
  return request({
    method: 'POST',
    url: Urls.setEvaluations,
    data: postData
  })
}
