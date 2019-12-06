import Taro from '@tarojs/taro'
import hotPng from "../../assets/hot.png";

const user = Taro.getStorageSync('userInfo')

const INITIAL_STATE = {
  onList: [],
  userInfo: user ? user: {} ,
  ruleList: [],
  isOpenPopMenu: false,
  isOpenPopSearch: false
}
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'getCategaryData':
      return getDataById(state,action.cateName)
    case 'getUserInfo':
      return setUserInfo(state,action.userInfo)
    case 'getRuleType':
      return setRuleTypes(state,action.ruleList)
    case 'getPopMenuStatus':
      return{
        ...state,
        isOpenPopMenu:action.status
      }
    case 'getPopSearchStatus':
      return{
        ...state,
        isOpenPopSearch:action.status
      }
    default:
      return state;
  }

}
function getDataById(state,id){
  switch (id) {
    case 1:
      return{
        ...state,
        onList: [
          {src: hotPng, title: '联影CT有多少种型号？', date: '2天前', eyesNum: 11293, goods: 400, bads: 10},
          {src: hotPng, title: '环形伪影的原因？', date: '2天前', eyesNum: 11293, goods: 400, bads: 10},
          {src: hotPng, title: '冠脉扫描的主意事项？', date: '2天前', eyesNum: 11293, goods: 400, bads: 10},
          {src: hotPng, title: '联影CT设备日常维护？', date: '2天前', eyesNum: 11293, goods: 400, bads: 10},
          {src: hotPng, title: '联影售后维护？', date: '3天前', eyesNum: 11293, goods: 400, bads: 10},
          {src: hotPng, title: '胶片打印流程？', date: '2天前', eyesNum: 11293, goods: 400, bads: 10},
          {src: hotPng, title: '光梭平台？', date: '2天前', eyesNum: 11293, goods: 400, bads: 10}]
      }
    case 2:
      return {
        ...state,
        onList: [
          {src: hotPng, title: '联影CT有多少种型号？', date: '2天前', eyesNum: 11293, goods: 400, bads: 10},
          {src: hotPng, title: '环形伪影的原因？', date: '2天前', eyesNum: 11293, goods: 400, bads: 10}]
      }
    case 3:
      return{
        ...state,
        onList: [
          {src: hotPng, title: '联影CT有多少种型号？', date: '2天前', eyesNum: 11293, goods: 400, bads: 10},
          {src: hotPng, title: '环形伪影的原因？', date: '2天前', eyesNum: 11293, goods: 400, bads: 10},
          {src: hotPng, title: '光梭平台？', date: '2天前', eyesNum: 11293, goods: 400, bads: 10}]
      }
    default:
      return{
        ...state,
        onList:[]
      }
  }
}

function setUserInfo(state,userInfo) {
    Taro.setStorage({key:'userInfo',data:userInfo})
    return {
      ...state,
      userInfo:userInfo
    }


}

function setRuleTypes(state,ruleList){
  return {
    ...state,
    ruleList: ruleList
  }
}
