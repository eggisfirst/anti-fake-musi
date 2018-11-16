const codeData = (state = {
  brand: 'calia',  // 品牌
  count: 1,  // 验证次数
  moNo: "C01201705220036", // 制令号
  goodsCode: "1212010000201499", // 产品代号
  goodsName: "PZZ1-002乳胶枕/60*40*16",  // 产品名称
  goodsSpec: "DH-2乳胶枕(0769)(2个/箱)&60*40*16",  // 产品规格
  pdName: "生产四",  // 生产部门
  scanName: "0769-pad03",  // 出货扫描人
  status: 1}, action) => {
  switch (action.type) {
    case 'GET_CODE_DATA':
      return action.arr
    default:
      return state
  }
}

export default codeData