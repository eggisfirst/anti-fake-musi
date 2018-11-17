const codeData = (state = {}, action) => {
  switch (action.type) {
    case 'GET_CODE_DATA':
      return action.arr
    default:
      return state
  }
}

export default codeData