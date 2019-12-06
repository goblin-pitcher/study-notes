import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {pushChatMsgs, scrollToEnd} from '@/store/chat/action'
import {debounce} from '@/common/tools'
import InputBox from './InputBox'
import ChatDrawer from './ChatDrawer'
import PromptMenu from './PromptMenu'

import * as msgHandler from '../msgHandler'
import './index.scss'

@connect(() => ({}), {pushChatMsgs, scrollToEnd})
export default class ChatInput extends Component {
  state = {
    showEmojiMenu: false,
    showPromptMenu: false,
    renderDrawer: false, // 表情图片较多，渲染放在第一次打开表情栏时进行
    inputAttrs: {
      chatText: this.chatClearText,
      cursor: 0
    }
  }
  chatClearText = ''

  componentDidMount() {
    if (this.state.renderDrawer) return
    // 表情图片太多，请求耗时较长且进入初始页面时不会打开表情菜单，因此异步进行表情栏的加载
    setTimeout(() => {
      this.setState({
        renderDrawer: true
      })
    }, 1000)
  }

  setChatBlur = (ev) => {
    const {inputAttrs} = this.state
    inputAttrs.cursor = ev.detail.cursor
  }

  resetInputAttrs(state) {
    // 发送消息后，chatText清空时若每次都是''，diff时易判定为不更新
    this.chatClearText = this.chatClearText === '' ? null : ''
    return new Promise(res => {
      this.setState({
        inputAttrs: {
          chatText: this.chatClearText,
          cursor: -1
        },
        ...state
      }, res)
    })
  }

  setChatText = (ev) => {
    if (ev.type === 'emoji') {
      this.setEmojiToText(ev.value)
      return
    }
    if (ev.type === 'voice') {
      this.setValToText(ev.value)
      return
    }
    if (ev.type === 'prompt') {
      this.sendMsg({id: ev.id, text: ev.value})
      return
    }
    const {inputAttrs} = this.state
    inputAttrs.chatText = ev.detail.value
    inputAttrs.cursor = ev.detail.cursor
    this.updatePromptMenu(inputAttrs)
    return inputAttrs.chatText
  }
  setValToText(val){
    const {chatText, cursor} = this.state.inputAttrs
    const newChatText = chatText ? chatText.substr(0, cursor) + val + chatText.substr(cursor) : val
    const newCursor = cursor + val.length
    this.setState({
      inputAttrs: {
        chatText: newChatText,
        cursor: newCursor
      }
    })
  }
  setEmojiToText(emojiVal) {
    const {chatText, cursor} = this.state.inputAttrs
    if (emojiVal === 'delete') {
      const {newChatText, newCursor} = msgHandler.textDelete(chatText, cursor)
      // 手动更新
      this.setState({
        inputAttrs: {
          chatText: newChatText,
          cursor: newCursor
        }
      })
    } else {
      this.setValToText(emojiVal)
    }
  }

  sendQuestionCB = () => this.resetInputAttrs({showPromptMenu: false})

  clickSendMsg = () => {
    const {inputAttrs} = this.state
    const {chatText} = inputAttrs
    if (!chatText) return
    this.sendMsg({text: chatText})
  }
  sendMsg = msgHandler.requestQuestion(this.props.pushChatMsgs, this.props.scrollToEnd, this.sendQuestionCB)
  changeEmojiMenuState = (ev) => {
    if (ev) ev.preventDefault()
    this.setState({
      showEmojiMenu: !this.state.showEmojiMenu,
    })
  }
  // 500ms以内没有输入才获取联想
  updatePromptMenu = debounce(function ({chatText, cursor}) {
    let newState = {
      inputAttrs: {
        chatText,
        cursor
      },
    }
    if (!this.state.showPromptMenu) {
      newState.showPromptMenu = true
    }
    this.setState(newState)
  }, 500)

  changeMenuState() {
    const {showEmojiMenu, showPromptMenu} = this.state
    if (showEmojiMenu) {
      this.changeEmojiMenuState()
    }
    if (showPromptMenu) {
      this.setState({
        showPromptMenu: false
      })
    }
  }

  render() {
    console.log('chatInput render')
    const {showEmojiMenu, showPromptMenu, renderDrawer, inputAttrs} = this.state
    return (
      <View className='chat-input'>
        <PromptMenu {...{
          text: inputAttrs.chatText,
          showMenu: showPromptMenu,
          selectPrompt: this.setChatText
        }}></PromptMenu>
        <InputBox {...{
          onChangeMenuState: this.changeEmojiMenuState,
          showEmojiMenu,
          value: inputAttrs.chatText,
          onSend: this.clickSendMsg,
          onSetText: this.setChatText,
          onBlur: this.setChatBlur
        }}></InputBox>
        {
          renderDrawer ? (
            <ChatDrawer {...{
              showDrawer: showEmojiMenu,
              onSend: this.clickSendMsg,
              onSetEmoji: this.setChatText,
              onChangeMenuState: this.changeEmojiMenuState
            }}></ChatDrawer>
          ) : null
        }
        {/*预留空间，方便iphoneX等机型操作*/}
        <View style='height:60rpx;'></View>
        <View className='chat-mask' onClick={this.changeMenuState}
              style={{display: showEmojiMenu || showPromptMenu ? '' : 'none'}}/>
      </View>
    )
  }
}
