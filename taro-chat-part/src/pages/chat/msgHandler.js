import {emojiMap} from './ChatInput/emojiData'
import {assetsUrl} from "@/service/config"
import {getType} from "@/common/tools"
import {getSearch, findAnswerById} from '@/service/api/chatApi'

export const textDelete = (chatText, cursor) => {
  let newChatText = null
  let newCursor = null
  if (chatText[cursor - 1] === ']') {
    for (let i = cursor - 1; i >= 0; i--) {
      if (chatText[i] === '[') {
        newCursor = i
        break
      }
    }
    if (newCursor !== null) {
      newChatText = chatText.substr(0, newCursor) + chatText.substr(cursor)
      return {newChatText, newCursor}
    }
  }
  newChatText = chatText.substr(0, cursor - 1) + chatText.substr(cursor)
  newCursor = cursor - 1
  return {newChatText, newCursor}
}

function textTrans(str) {
  const replacedStr = str.replace(/\[.+?\]/g, item => {
    if (emojiMap.has(item)) {
      return `<img src='${assetsUrl}/emoji/${emojiMap.get(item)}' />`
    }
    return item
  })
  return `<div style='display: flex;align-items: center;flex-wrap: wrap;'>${replacedStr}</div>`
}

function formatMsg(msg) {
  const msgTemplate = {
    userType: 'user',
    type: 'text',
    time: new Date().getTime(),
    uid: 0,
    content: {text: ''}
  }
  return {...msgTemplate, ...msg}
}

export const myMsgTrans = ({type = 'text', value}) => {
  let transMsg, transText
  // 根据发送消息类型分别进行处理
  switch (type) {
    case 'text':
      transText = textTrans(value)
      transMsg = formatMsg({content: {text: transText}})
      break
  }
  return transMsg
}

export const otherMsgTrans = (data, sendText) => {
  const dataType = getType(data)
  let transMsg = null
  // 调用findById接口
  if (dataType === 'object') {
    transMsg = formatMsg({
      uid: 1,
      content: {type: 1, text: data.answer, id: data.id, refid: data.answerDetail}
    })
  }
  // 调用getSearch接口
  if (dataType === 'array') {
    if (!data.length) {
      // 没有答案
      transMsg = formatMsg({uid: 1, content: {type: 0}})
    } else if (data[0].question === sendText) {
      // 问题输入完直接点的发送，返回的答案中正好有该问题完全匹配的答案
      transMsg = formatMsg({
        uid: 1,
        content: {type: 1, text: data[0].answer, id: data[0].id, refid: data[0].answerDetail}
      })
    } else {
      // 没找到完全匹配答案，显示相似问题
      transMsg = formatMsg({
        uid: 1,
        content: {type: 2, data: data.map(item => ({id: item.id, text: item.question}))}
      })
    }
  }
  return transMsg
}

export function timeToDate(time) {
  const now = new Date()
  const timeDate = new Date(time)
  if (now.getFullYear() !== timeDate.getFullYear()) {
    const timeArr = timeDate.toLocaleDateString().split('/')
    return `${timeArr[0]}年${timeArr[1]}月${timeArr[2]}日`
  }
  if (now - timeDate > 1000 * 3600 * 24 * 7) {
    return `${timeDate.getMonth() + 1}年${timeDate.getDate()}  ${timeDate.getHours()}:${timeDate.getMinutes()}`
  }
  const NumToCN = {
    0: '日', 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六'
  }
  return `星期${NumToCN[timeDate.getDay()]}  ${timeDate.getHours()}:${timeDate.getMinutes()}`
}

// 用于生成发送消息的函数
export const requestQuestion = (pushChatMsgs, scrollToEnd, addQuestionCB = () => null) => ({id, text}) => {
  const transMsg = myMsgTrans({value: text})
  pushChatMsgs(transMsg).then(addQuestionCB).then(scrollToEnd)
  const requestApi = id ? findAnswerById : getSearch
  const requestData = id ? {id} : {question: text}
  // 消息返回时间小于500ms则等到500ms后再滚动至底部，若返回时间大于500ms,返回后再滚动至底部
  // 500ms是两次滚动的缓冲时间，避免连续触发滚动，后面的滚动无法滚到最底部
  Promise.all([
    requestApi(requestData),
    new Promise(res => {
      setTimeout(res, 500)
    })
  ]).then(res => pushChatMsgs(otherMsgTrans(res[0].data))).then(scrollToEnd)
}
// 用于生产加载历史记录的函数
// 暂无接口，使用mock数据
let mockMsgData = [
  {userType: "user", type: "text", time: 1542548000000, uid: 0, content: {text: "什么是冠脉扫描？"}},
  {
    userType: "user",
    type: "text",
    time: 1542548001000,
    uid: 1,
    content: {type: 1, text: "冠状动脉CT检查是一项用于检查动脉血管是否正常的一项辅助检查。"}
  }
]
export const loadHistory = unshiftChatMsgs => () => {
  mockMsgData.forEach(item => {
    item.time = item.time - 1000000
  })
  const timeMsg = {userType: 'system', type: "time", time: mockMsgData[0].time}
  return unshiftChatMsgs([timeMsg, ...mockMsgData])
}
