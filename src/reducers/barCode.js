const barCode = (state = null, action) => {
  switch (action.type) {
    case 'GET_BARCODE':
      return action.arr
    default:
      return state
  }
}

export default barCode