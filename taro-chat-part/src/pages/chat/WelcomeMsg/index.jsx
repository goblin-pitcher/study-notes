import Taro, {Component} from '@tarojs/taro'
import {connect} from '@tarojs/redux'
import {View, Image} from '@tarojs/components'
import OtherMsg from '../MsgBody/OtherMsg'
import './index.scss'

@connect(state => ({chatImgs: state.chat.chatImgs}), {})
/* *
*此处不适合用PureComponent,因为欢迎页仅需判断chatImgs中第一张图片是否变化，若使用PureComponent,
* 当新消息中包含图片时，改组件也会重新渲染
* */
export default class WelcomeMsg extends Component {
  state = {
    defaultMsg: {
      userType: 'user',
      type: 'text',
      uid: 1,
      content: {}
    },
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.chatImgs[0] === nextProps.chatImgs[0] && this.state.defaultMsg === nextState.defaultMsg) {
      return false
    }
    return true
  }
  previewImg=()=>{
    const {chatImgs} = this.props
    console.log(chatImgs)
    Taro.previewImage({
      current: chatImgs[0],
      urls: chatImgs
    })
  }
  render() {
    console.log('welcome render')
    const {chatImgs} = this.props
    // this.state.defaultMsg.msg.content.data.text = ()
    return (
      <View className='welcome-msg'>
        <OtherMsg {...{row: this.state.defaultMsg}}>
          <View>
            Hi，我是小影，有什么可以帮助的吗？如果想获取官方信息，清扫面小面二维码哦！
            <Image mode='widthFix' src={chatImgs[0]} onClick={this.previewImg}></Image>
            <View style='text-align:center;font-size: 0.9em;color: #5063c2;'>联影官方二维码</View>
          </View>
        </OtherMsg>
      </View>
    )
  }
}
