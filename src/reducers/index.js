import { combineReducers } from 'redux'
import todos from './todos'
import clicks from './clicks'
import codeData from './codeData'
import brandType from './brandType'
import barCode from './barCode'
import statusChange from './statusChange'
// import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
  todos,
  clicks,
  codeData,
  brandType,  
  barCode,
  statusChange

})

export default todoApp