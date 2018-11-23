const submitTips = (state = true, action) => {
  switch (action.type) {
    case 'SUBMIT_SUCCESS':
      return action.arr
    default:
      return state
  }
}

export default submitTips