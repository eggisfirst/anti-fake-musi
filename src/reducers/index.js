import { combineReducers } from 'redux'
import todos from './todos'
import clicks from './clicks'
import codeData from './codeData'
import brandType from './brandType'

// import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
  todos,
  clicks,
  codeData,
  brandType
})

export default todoApp