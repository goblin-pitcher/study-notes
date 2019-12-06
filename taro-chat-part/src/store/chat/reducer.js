import Taro from '@tarojs/taro'
import * as CHAT from '@/store/chat/action-type'
import qrcode from '@/assets/qrcode.png'
import {createKeyName} from '@/common/storageManager'

const welcomeMsg = {userType: "system", type: "text",time:0, content: {text: `您好，这里是智能客服-小影`}}
const INITIAL_STATE = {
  chatMsgs: [],
  chatImgs: [qrcode],
  scrollToId: ''
}
const storeChatMsgs = Taro.getStorageSync(createKeyName(['chat','chatMsgs']))
INITIAL_STATE.chatMsgs = [
  welcomeMsg,
  ...(storeChatMsgs||[])
]

export default function chat(state = INITIAL_STATE, action) {
  const value = Array.isArray(action.value) ? action.value : [action.value]
  switch (action.type) {
    case CHAT.PUSH_MSG:
      return {
        ...state,
        chatMsgs: state.chatMsgs.concat(value)
      }
    case CHAT.UNSHIFT_MSG:
      return {
        ...state,
        chatMsgs: value.concat(state.chatMsgs)
      }
    case CHAT.PUSH_IMG_LIST:
      return {
        ...state,
        chatImgs: state.chatImgs.concat(value)
      }
    case CHAT.UNSHIFT_IMG_LIST:
      // 第一张图是二维码
      return {
        ...state,
        chatImgs: [state.chatImgs[0], ...value, state.chatImgs.slice(1)]
      }
    case CHAT.SCROLL_TO_END:
      const scrollToId = state.scrollToId === CHAT.scrollEndId0 ? CHAT.scrollEndId1 : CHAT.scrollEndId0
      return {
        ...state,
        scrollToId
      }
    default:
      return state
  }
}
