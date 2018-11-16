const todos = (state = false, action) => {
  switch (action.type) {
    case 'TIPS':
      return action.arr
    default:
      return state
  }
}

export default todos