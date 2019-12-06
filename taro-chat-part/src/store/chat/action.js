import * as CHAT from '@/store/chat/action-type'

const handleMsgTime = 300
export const pushChatMsgs = payload => dispatch => new Promise(res => {
  dispatch({
    type: CHAT.PUSH_MSG,
    value: payload
  })
  res()
})
export const unshiftChatMsgs = payload => dispatch => new Promise(res => {
  setTimeout(() => {
    dispatch({
      type: CHAT.UNSHIFT_MSG,
      value: payload
    })
    res()
  }, handleMsgTime)
})

export const pushChatImgs = payload => {
  return {
    type: CHAT.PUSH_IMG_LIST,
    value: payload
  }
}
export const unshiftChatImgs = payload => {
  return {
    type: CHAT.UNSHIFT_IMG_LIST,
    value: payload
  }
}
export const scrollToEnd = () => dispatch => new Promise(res => {
  setTimeout(() => {
    dispatch({
      type: CHAT.SCROLL_TO_END
    })
    res()
  }, handleMsgTime)
})

