import Taro, {PureComponent} from '@tarojs/taro'
import {View, RichText, Image} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import PropTypes from 'prop-types'
import './index.scss'

@connect(state=>({userInfo: state.robotIndex.userInfo}),{})
// 继承PureComponent，防止userInfo其他内容变化导致MyMsg重新渲染
// 由于msg中只有msg.content是引用类型，且msg内容不会在添加后更改，因此可以用PureComponent
export default class MyMsg extends PureComponent {
  static propTypes = {
    row: PropTypes.object.isRequired
  }
  static defaultProps = {
    row: {}
  }
  onPlayVoice(){}
  onShowPic(){}
  renderSelectMsg() {
    const {row} = this.props
    if (row.type === 'img') {
      return (
        <View className='msg-content img' onClick={this.onShowPic}>
        </View>
      )
    }
    if (row.type === 'voice') {
      return (
        <View className='msg-content voice' onClick={this.onPlayVoice}>
          <View className='length'>{row.content.length}</View>
          <View className='icon my-voice'></View>
        </View>
      )
    }
    return (
      <View className='msg-content'>
        <RichText nodes={row.content.text}></RichText>
      </View>
    )
  }

  render() {
    console.log('myMsg render')
    const {avatarUrl} = this.props.userInfo
    return (
      <View className='my-msg'>
        <Image className='my-head-icon' mode='aspectFit' src={avatarUrl} />
        {
          this.renderSelectMsg()
        }
      </View>
    )
  }
}
