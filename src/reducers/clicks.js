const clicks = (state = false, action) => {
  switch (action.type) {
    case 'CLICK_BTN':
      return action.arr
    default:
      return state
  }
}

export default clicks