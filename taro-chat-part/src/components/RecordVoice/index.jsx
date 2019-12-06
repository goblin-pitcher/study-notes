import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'
import './index.scss'

// 该组件不需要state，因此采用无状态组件性能更好
export default function RecordVoice() {
  return (
    <View className='record-voice-animation'>
      <View className='voice-animation'>
        <View className='icon iconfont icon-microphone'></View>
        <View className='voice-animation_content'>
          <View className='voice-animation_cover'></View>
          <View className='voice-animation_line'>
            {
              new Array(8).fill(null).map((item,index)=>(
                <View key={`voice-line-${index}`}></View>
              ))
            }
          </View>
        </View>
      </View>
      <View className='voice-describe'>
        <View className='icon iconfont icon-rollback'></View>
        上滑取消
      </View>
    </View>
  )
}
RecordVoice.options = {
  addGlobalClass: true
}
