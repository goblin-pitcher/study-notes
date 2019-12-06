import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import 'taro-ui/dist/style/index.scss'
import { Provider } from '@tarojs/redux'
import Index from './pages/index'


import configStore from './store'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
const store = configStore()

class App extends Component {

  componentDidMount () {
  }

  componentDidShow () {
  }

  componentDidHide () {}

  componentDidCatchError () {}


  config = {
    pages: [
      'pages/index/index',
      'pages/index/detail/index',
      'pages/home/index',
      'pages/home/component/hospital/index',
      'pages/home/component/department/index',
      'pages/chat/index',
      'pages/chatDetail/index'
    ],
    subpackages:[
      {
        root:  'subPages1/',//手册下载分包
        pages: ['index/index']
      },
      {
        root:  'subPages2/',//设备管理分包
        pages: ['index/index']
      }
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    plugins : {
      WechatSI: {
        version: '0.3.3',
        provider: 'wx069ba97219f66d99'
      }
    }
  }



  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
