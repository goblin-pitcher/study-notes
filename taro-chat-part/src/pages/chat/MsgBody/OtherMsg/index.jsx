import Taro, {PureComponent} from '@tarojs/taro'
import {View, Image, Block} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {pushChatMsgs, scrollToEnd} from '@/store/chat/action'
import PropTypes from 'prop-types'
import {requestQuestion} from '../../msgHandler'
import robotIcon from '@/assets/robot.png'
import './index.scss'

@connect(() => ({}), {pushChatMsgs, scrollToEnd})
export default class OtherMsg extends PureComponent {
  static options = {
    addGlobalClass: true
  }
  static propTypes = {
    row: PropTypes.object.isRequired,
    evaluate: PropTypes.bool,
    setEvaluation: PropTypes.func.isRequired
  }
  static defaultProps = {
    row: {content: {type: 0, data: []}},
    evaluate: false,
    setEvaluation: () => {
    }
  }

  state = {
    evaluation: null
  }
  noData = '抱歉，这个问题不在小影能力范围内'
  hasData = '以下是为您提供的答案：'
  hasRelate = '抱歉，这个问题不在小影能力范围内，推荐以下相似问题：'
  like = '0'
  dislike = '1'

  onPlayVoice() {
  }

  onShowPic() {
  }

  evaluateMsg(ev) {
    const {dataset} = ev.target
    if (!('type' in dataset)) return
    const evaluation = dataset.type === this.state.evaluation ? null : dataset.type
    this.setState({
      evaluation
    })
    const {id} = ev.currentTarget.dataset
    const useful = evaluation === null ? null : (evaluation === 'like' ? this.like : this.dislike)
    const {setEvaluation} = this.props
    setEvaluation({id, useful})
  }

  clickMsg(ev) {
    const dataset = ev.target.dataset
    if ('id' in dataset) {
      this.sendMsg({id: dataset.id, text: dataset.question})
    }
    if ('refid' in dataset) {
      Taro.navigateTo({
        url: `/pages/chatDetail/index?refid=${dataset.refid}`
      })
    }
  }

  sendMsg = requestQuestion(this.props.pushChatMsgs, this.props.scrollToEnd)

  renderSelectMsg() {
    const {row, children, evaluate} = this.props
    const {noData, hasData, hasRelate} = this
    const {evaluation} = this.state
    if (row.type === 'img') {
      return (<View className='msg-content img' onClick={this.onShowPic}/>)
    }
    if (row.type === 'voice') {
      return (
        <View className='msg-content voice' onClick={this.onPlayVoice}>
          <View className='length'>{row.content.length}</View>
          <View className='icon other-voice'></View>
        </View>
      )
    }
    let textContent
    switch (row.content.type) {
      case 0: {
        textContent = (<Block>{noData}</Block>)
        break
      }
      case 1: {
        textContent = (<Block>
          {hasData}
          <View>{row.content.text}</View>
          {
            evaluate ? (
              <View className='answer-evaluation' data-id={row.content.id} onClick={this.evaluateMsg}>
                {!evaluation || evaluation === 'like' ?
                  <View className='icon iconfont icon-like-normal' hoverClass='iconfont_hover'
                        data-type='like'></View> : null}
                {!evaluation || evaluation === 'dislike' ?
                  <View className='icon iconfont icon-dislike-normal' hoverClass='iconfont_hover'
                        data-type='dislike'></View> : null}
              </View>) : null
          }
          {row.content.refid ? (
            <View data-refid={row.content.refid} className='show-detail'>查看更多</View>) : null}
        </Block>)
        break
      }
      case 2: {
        textContent = (<Block>
          {hasRelate}
          {row.content.data.map((item, index) => (
            <View key={item.id} data-id={item.id} data-question={item.text} className='show-relate'>
              {`${index + 1}. ${item.text}`}
            </View>)
          )}
        </Block>)
        break
      }
      default: {
        textContent = (
          <Block>
            {children}
          </Block>
        )
        break
      }
    }
    return (<View className='msg-content' onClick={this.clickMsg}>{textContent}</View>)
  }

  render() {
    console.log('otherMsg render')
    return (
      <View className='other-msg'>
        <Image className='other-head-icon' mode='aspectFit' src={robotIcon}/>
        {
          this.renderSelectMsg()
        }
      </View>
    )
  }
}
