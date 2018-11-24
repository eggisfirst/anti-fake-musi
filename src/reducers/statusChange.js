const statusChange = (state = false, action) => {
  switch (action.type) {
    case 'STATUS_CHANGE':
      return action.arr
    default:
      return state
  }
}

export default statusChange