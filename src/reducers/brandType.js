const brandType = (state = true, action) => {
  switch (action.type) {
    case 'GET_BRAND_TYPE':
      return action.arr
    default:
      return state
  }
}

export default brandType