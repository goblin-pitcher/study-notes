import Taro, {PureComponent} from '@tarojs/taro'
import {View, Swiper, SwiperItem, Image} from '@tarojs/components'
import PropTypes from 'prop-types'
import {assetsUrl} from '@/service/config'
import {emojiData} from '../emojiData'
import './index.scss'

export default class ChatDrawer extends PureComponent {
  static options = {
    addGlobalClass: true
  }
  static propTypes = {
    showDrawer: PropTypes.bool.isRequired,
    onSend: PropTypes.func.isRequired,
    onSetEmoji: PropTypes.func.isRequired,
    onChangeMenuState: PropTypes.func.isRequired
  }
  static defaultProps = {
    showDrawer: false,
    onSend: () => {

    },
    onSetEmoji: () => {
    },
    onChangeMenuState: () => {
    }
  }
  emojiList = emojiData

  clickEmoji(ev) {
    const {alt} = ev.target.dataset
    if (!alt) return
    this.props.onSetEmoji({type: 'emoji', value: alt})
  }

  clickSend() {
    const {showDrawer, onChangeMenuState, onSend} = this.props
    if(showDrawer){
      onChangeMenuState()
    }
    onSend()
  }
  render() {
    console.log('emoji-render')
    const {showDrawer, onChangeMenuState} = this.props
    return (
      <View className={`chat-menu ${showDrawer ? 'active' : ''}`}>
        <View style={{display: showDrawer ? '' : 'none'}}>
          <Swiper indicatorDots onClick={this.clickEmoji}>
            {
              this.emojiList.map((swiperItem, contentId) => (
                <SwiperItem key={contentId}>
                  {
                    swiperItem.map(item => (
                      <View key={`${contentId}-${item.url}`} className='emoji-item' data-alt={item.alt}>
                        <Image mode='widthFix' src={`${assetsUrl}/emoji/${item.url}`} />
                      </View>
                    ))
                  }
                </SwiperItem>
              ))
            }
          </Swiper>
          <View className='emoji-btns'>
            <View className='icon iconfont icon-emoji' onClick={onChangeMenuState}></View>
            <View className='drawer-msg-send' hoverClass='drawer-msg-send_hover' onClick={this.clickSend}>发送</View>
          </View>
        </View>
      </View>
    )
  }
}
