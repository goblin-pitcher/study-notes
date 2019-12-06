export const PUSH_MSG = Symbol('push msg to msg list')
export const UNSHIFT_MSG = Symbol('msg list unshift')
export const PUSH_IMG_LIST = Symbol('img list push')
export const UNSHIFT_IMG_LIST = Symbol('img list unshift')
export const SCROLL_TO_END = Symbol('scroll to end')
/*
ScrollView 组件通过ScrollIntoView方法可滚动至对应ID的位置，因此在消息底部设置两个高度为0的View,
两个View的ID不同，scrollIntoView交替滚动至两个底部View，使得需要滚动至消息最低部时，都可以用
ScrollIntoView达到此效果
*/
export const scrollEndId0 = 'scroll-end-0'
export const scrollEndId1 = 'scroll-end-1'

