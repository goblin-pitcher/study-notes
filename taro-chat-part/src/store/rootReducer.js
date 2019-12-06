import { combineReducers } from 'redux'
import counter from './counter/reducer'
import robotIndex from './robotIndex/reducer'
import chat from './chat/reducer'
import hospital from './hospital/reducer'

export default combineReducers({
  counter,
  robotIndex,
  chat,
  hospital
})
