import Taro, {Component} from '@tarojs/taro'
import {View, RichText, Image} from '@tarojs/components'
import {getMedia} from '@/service/api/chatApi'
import './index.scss'

export default class chatDetail extends Component {
  config = {
    navigationBarTitleText: '问题详情'
  }
  state = {
    nodeList: [],
    imgList: [],
    imgUrls: []
  }

  componentDidMount() {
    const {refid} = this.$router.params
    getMedia({refid}).then(res => {
      const data = res.data
      Taro.setNavigationBarTitle({title: data.mediaTitle})
      this.parseResData(data)
    })
  }

  parseResData(resData) {
    const splitStr = '<<&*$!$*&>>'
    let nodeList, imgList, imgUrls
    let imgArr = []
    // 将img标签抽离出来
    const replaceStr = resData.mediaContent.replace(/\<img(.|\r|\n)+?>/g, item => {
      imgArr = [...imgArr, item.replace(/(\r|\n)/g, '')]
      return splitStr
    })
    // 从img中的信息抽取src、width、height信息
    imgList = imgArr.map((item) => {
      let imgObj = {};
      item.replace(/src="(.+?)"|width="(\d+?)"|height="(\d+?)"/g, (matchStr, $1, $2, $3) => {
        if ($1) imgObj.src = $1
        if ($2) imgObj.width = parseFloat($2)
        if ($3) imgObj.height = parseFloat($3)
        return ''
      })
      return imgObj
    })
    nodeList = replaceStr.split(splitStr)
    imgUrls = imgList.map(item => item.src)
    this.setState({
      nodeList,
      imgList,
      imgUrls
    })
  }

  transStyle(index) {
    const {imgList} = this.state
    if (index >= imgList.length) return ''
    const width = imgList[index].width;
    return width < 375 ? `width: ${width * 2}rpx;` : ''
  }
  previewImg(ev){
    const dataset = ev.target.dataset
    if(!('image' in dataset)) return
    const id = parseFloat(dataset.image)
    const {imgUrls} = this.state
    Taro.previewImage({
      current: imgUrls[id],
      urls: imgUrls
    })
  }
  render() {
    const {nodeList, imgList} = this.state
    return (
      <View className='chat-detail'>
        {nodeList.map((node, index) => (
          <View key={index}>
            <RichText nodes={node}></RichText>
            {
              imgList[index] ?
                <Image data-image={index} onClick={this.previewImg} className='media-image' mode='widthFix'
                       src={imgList[index].src} style={this.transStyle(index)}></Image>
                : null
            }
          </View>
        ))}
      </View>
    )
  }
}
