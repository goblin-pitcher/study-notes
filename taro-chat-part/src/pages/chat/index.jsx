import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView, Image} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {scrollToEnd, unshiftChatMsgs} from '@/store/chat/action'
import {scrollEndId0, scrollEndId1} from '@/store/chat/action-type'
import {MsgBody, WelcomeMsg, ChatInput} from './manage'
import {loadHistory} from "./msgHandler";
import loading from '@/assets/loading.gif'
import './index.scss'

// 展示组件，功能部分放入MsgBody, WelcomeMsg, ChatInput等容器组件中
@connect(state => {
  return {
    scrollToId: state.chat.scrollToId
  }
}, {scrollToEnd, unshiftChatMsgs})
export default class Chat extends Component {
  config = {
    navigationBarTitleText: '聊天页面'
  }

  state = {
    scrollTop: null
  }

  componentDidMount() {
    const onScroll = this.props.scrollToEnd
    onScroll()
  }

  toLoadHistory = loadHistory(this.props.unshiftChatMsgs)

  getHsitory() {
    this.toLoadHistory().then(() => {
      const scrollTop = this.state.scrollTop === 300 ? 301 : 300
      this.setState({
        scrollTop
      })
    })
  }

  render() {
    console.log('chat render')
    const {scrollToId} = this.props
    const {scrollTop} = this.state
    return (
      <View className='main'>
        <ScrollView className='msg-list' scrollY scrollWithAnimation scrollTop={scrollTop} scrollIntoView={scrollToId}
                    onScrollToUpper={this.getHsitory}>
          <Image src={loading} className='loading'></Image>
          <WelcomeMsg></WelcomeMsg>
          <MsgBody></MsgBody>
          <View id={scrollEndId0}></View>
          <View id={scrollEndId1}></View>
        </ScrollView>
        <ChatInput></ChatInput>
      </View>
    )
  }
}
