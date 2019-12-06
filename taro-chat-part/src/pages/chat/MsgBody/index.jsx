import Taro, {PureComponent} from '@tarojs/taro'
import {View, Block} from "@tarojs/components";
import {connect} from '@tarojs/redux'
import MyMsg from './MyMsg'
import OtherMsg from './OtherMsg'
import './index.scss'
import {timeToDate} from '../msgHandler'
import {setEvaluations} from '@/service/api/chatApi'

@connect(state => ({chatMsgs: state.chat.chatMsgs}))
export default class MsgBody extends PureComponent {
  date = new Date()
  evaluationMap = new Map()

  componentWillUnmount() {
    if (!this.evaluationMap.size) return
    let idList = []
    let usefulList = []
    this.evaluationMap.forEach((val, key) => {
      idList.push(key)
      usefulList.push(val)
    })
    this.evaluationMap.clear()
    setEvaluations({idList, usefulList}).catch(err => {
      Taro.showToast({
        title: `评论答案失败：${err}`,
        icon: 'none'
      })
    })
  }

  setEvaluation = ({id, useful}) => {
    if (!id) return
    if (useful === null) {
      this.evaluationMap.delete(id)
    } else {
      this.evaluationMap.set(id, useful)
    }
    console.log(this.evaluationMap)
  }

  renderByUserType() {
    const {chatMsgs} = this.props
    return (<Block>
      {
        chatMsgs.map(row => {
          if (row.userType === 'system') {
            return (
              <View key={row.time} className='system-msg'>
                {
                  row.type === 'text' ?
                    (<View className='system-msg_content'>
                      {row.content.text}
                    </View>) : null
                }
                {
                  row.type === 'time' ?
                    (<View className='system-msg_time'>
                      {timeToDate(row.time)}
                    </View>) : null
                }
              </View>
            )
          }
          if (row.uid === 0) {
            return (
              <MyMsg key={row.time} {...{row}} />
            )
          }
          if (row.uid === 1) {
            return (
              <OtherMsg key={row.time} {...{
                row,
                evaluate: (new Date(row.time) > this.date),
                setEvaluation: this.setEvaluation
              }} />
            )
          }
        })
      }
    </Block>)
  }

  render() {
    console.log('msgbody render')
    return (
      <View className='msg-body'>
        {
          this.renderByUserType()
        }
      </View>
    )
  }
}
