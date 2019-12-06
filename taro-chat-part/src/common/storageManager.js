import Taro from '@tarojs/taro'
import { PUSH_MSG, UNSHIFT_MSG } from '../store/chat/action-type'
import { debounce } from './tools'

/**
 * 需要持久化的项写在storeState中，格式为===>>‘reducer名称’：{'持久项名称': [ 触发的action-type ,...]}
 *  */
const storeState = Object.freeze({
    chat: { chatMsgs: [PUSH_MSG, UNSHIFT_MSG] }
})
const rewriteStore = Object.freeze({
    [createKeyName(['chat', 'chatMsgs'])]: storeChatMsgs
})
const actionMap = new Map()

Object.keys(storeState).forEach(stateName => {
    const state = storeState[stateName]
    Object.keys(state).forEach(itemName => {
        state[itemName].forEach(action => {
            actionMap.set(action, [stateName, itemName])
        })
    })
})

// 防抖处理，避免短时间内多次写入，间隔500ms后再进行持久化
const storeData = debounce(Taro.setStorageSync, 500)

//=======================分割线，不直接使用storeData存储的，此处写存储数据的方法==============================

function storeChatMsgs(key, chatMsgs) {
    const filterMsgs = []
    chatMsgs.forEach(item => {
        if (item.userType === 'system') return
        filterMsgs.push(item)
    })
    storeData(key, filterMsgs)
}

//================================================分割线===================================================

function setStorage(getState, type) {
    const valNames = actionMap.get(type)
    if (!valNames) return
    const state = getState()
    const key = createKeyName(valNames)
    const value = valNames.reduce((a, b) => a[b], state)
    if (key in rewriteStore) {
        rewriteStore[key](key, value)
    } else { storeData(key, value) }
}

export function createKeyName(keyArr) {
    return keyArr.join('-')
}

export const storageMiddleware = ({ dispatch, getState }) => next => action => {
    // 触发dispatch后存储数据
    Promise.resolve().then(() => {
        setStorage(getState, action.type)
    })
    return next(action)
}