import Taro, {Component} from '@tarojs/taro'
import {View, RichText} from '@tarojs/components'
import PropTypes from 'prop-types'
import {getSuggestion} from '@/service/api/chatApi'

import './index.scss'

export default class PromptMenu extends Component {
  static propTypes = {
    text: PropTypes.string,
    showMenu: PropTypes.bool.isRequired,
    selectPrompt: PropTypes.func.isRequired
  }
  static defaultProps = {
    text: '',
    showMenu: false,
    selectPrompt: () => {
    }
  }
  state = {
    suggestion: []
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.text && nextProps.text !== this.props.text) {
      this.getSuggestionList(nextProps.text)
    }
    if (!nextProps.showMenu && this.props.showMenu) {
      // 点击遮罩时，关闭联想菜单
      return true
    }
    if (this.state.suggestion !== nextState.suggestion) {
      return true
    }
    return false
  }

  getSuggestionList(text) {
    getSuggestion({suggestion: text}).then(res => {
      const answerList = res.data;
      this.setState({
        suggestion: answerList.map(item => ({id: item.id, question: item.question}))
      })
    }).catch(err => {
      console.log(err)
    })
  }

  transText(oriText) {
    const {text: check} = this.props
    const textArr = oriText.split('')
    const transText = textArr.map(word => {
      if (check.includes(word)) {
        return `<span style="color:#ffa94c">${word}</span>`;
      }
      return word;
    }).join('')
    return transText.replace(/<\/span><span.+?>/g, '')
  }

  selectMenuItem(ev) {
    const {dataset} = ev.target
    const setChatText = this.props.selectPrompt
    if (!('id' in dataset)) return
    const selectItem = this.state.suggestion[dataset.id]
    setChatText({type: 'prompt', id: selectItem.id, value: selectItem.question})
  }

  render() {
    console.log('prompt menu render')
    const {showMenu} = this.props
    return (
      <View className='prompt-menu' onClick={this.selectMenuItem} style={{display: showMenu ? '' : 'none'}}>
        {showMenu ? this.state.suggestion.map((item, index) => (
          <View key={item.id} className='prompt-item' data-id={index}>
            <RichText nodes={this.transText(item.question)}></RichText>
          </View>
        )) : null
        }
      </View>
    )
  }
}
