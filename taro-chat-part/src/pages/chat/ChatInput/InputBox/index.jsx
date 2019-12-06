import Taro, {Component} from '@tarojs/taro'
import {View, Block, Textarea} from '@tarojs/components'
import RecordVoice from '@/components/RecordVoice'
import PropTypes from 'prop-types'
import {throttle} from '@/common/tools'
import './index.scss'

let manager = null
try {
  const plugin = Taro.requirePlugin('WechatSI')
  manager = plugin.getRecordRecognitionManager()
} catch (ex) {
  Taro.showToast({
    title: '语音插件加载失败',
    icon: 'none'
  })
}
const lang = 'zh_CN' // 语音转文字，语言参数
export default class InputBox extends Component {
  static options = {
    addGlobalClass: true
  }
  static propTypes = {
    showEmojiMenu: PropTypes.bool.isRequired,
    value: PropTypes.string,
    onSend: PropTypes.func.isRequired,
    onSetText: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChangeMenuState: PropTypes.func.isRequired,
  }
  static defaultProps = {
    showEmojiMenu: false,
    value: '',
    onSend: () => {
    },
    onSetText: () => '',
    onBlur: () => {
    },
    onChangeMenuState: () => {
    },
  }

  constructor(props) {
    super(props)
    if (!manager) return
    manager.onStop = (res) => {
      if (this.isRecordStop) return
      const result = res.result
      const {onSetText} = this.props
      if (!result) {
        Taro.showToast({
          title: '未检测到语音 \n 请重新说话',
          icon: 'none'
        })
        return
      }
      onSetText({type: 'voice', value: result})
    }
    manager.onError = (res) => {
      this.setState({
        onRecord: false
      })
      Taro.showToast({
        title: '录音失败：' + res.msg,
        icon: 'none'
      })
    }
  }

  state = {
    mode: 'text',
    onRecord: false,
  }
  isRecordStop = false
  startPositionY = 0
  throttleMove = throttle(this.pressMove, 200)

  shouldComponentUpdate(nextProps, nextState) {
    // 语音状态时，添加表情或完成了语音录入，自动切换回文本模式
    if (nextProps.value && this.props.value !== nextProps.value && this.state.mode === 'voice') {
      nextState.mode = 'text'
      return true
    }
    // 仅在添加表情和发送时渲染，text为了触发联想时的修改，不需要InputBox更新
    if (this.props.showEmojiMenu || !nextProps.value) {
      return true
    }
    return false
  }

  chageMode() {
    const mode = this.state.mode === 'text' ? 'voice' : 'text'
    this.setState({
      mode
    })
  }

  startRecord(ev) {
    this.isRecordStop = false
    this.startPositionY = ev.touches[0].clientY
    this.setState({
      onRecord: true
    })
    if (!manager) {
      Taro.showToast({
        title: '语音插件加载失败，语音功能无法使用',
        icon: 'none'
      })
      return
    }
    manager.start({
      lang
    })
  }

  stopRecord() {
    this.stopRecord = true
    this.endRecord()
  }

  endRecord() {
    if (manager) {
      manager.stop()
    }
    this.setState({
      onRecord: false
    })
  }

  pressMove(ev) {
    if (this.startPositionY - ev.touches[0].clientY > 60) {
      this.stopRecord()
    }
  }

  setEmojiMenu(ev) {
    const {onChangeMenuState, showEmojiMenu} = this.props
    if ('type' in ev.target.dataset) {
      onChangeMenuState()
      return
    }
    if (showEmojiMenu) {
      onChangeMenuState()
    }
  }


  renderByMode() {
    const {mode, onRecord} = this.state
    const {value, onSetText, onBlur} = this.props
    if (mode === 'text') {
      return (
        <Block>
          <View className='icon iconfont icon-sound' onClick={this.chageMode}></View>
          <Textarea className='input-text' cursor={5} autoHeight cursorSpacing={15} value={value} onInput={onSetText}
                    onBlur={onBlur}></Textarea>
        </Block>
      )
    }
    return (
      <Block>
        <View className='icon iconfont icon-keyboard' onClick={this.chageMode}></View>
        <View className='input-voice' hoverClass='input-voice_hover' onTouchStart={this.startRecord}
              onTouchEnd={this.endRecord} onTouchMove={this.throttleMove}>{onRecord ? '松开 结束' : '按住 说话'}</View>
      </Block>
    )
  }

  render() {
    console.log('inputBox render')
    const {showEmojiMenu, onSend} = this.props
    const {onRecord} = this.state
    return (
      <Block>
        <View className='input-box' onClick={this.setEmojiMenu}>
          {this.renderByMode()}
          <View className='icon iconfont icon-send' onClick={onSend}></View>
          <View className='icon iconfont icon-keyboard' style={{display: showEmojiMenu ? '' : 'none'}}
                data-type='emoji'></View>
          <View className='icon iconfont icon-emoji' style={{display: showEmojiMenu ? 'none' : ''}}
                data-type='emoji'></View>
        </View>
        {
          onRecord ? (<RecordVoice/>) : null
        }
      </Block>
    )
  }
}
