import { Request } from './index'

class IndexModel extends Request {
  /**获取账号的个人信息 */
  getTheCode(code) {
    return this.getSecretData({
      url: "api/antifake/v1/antiFakeVerify",
      data: {
        securityCode: code
      },
    })
  }

  // getTicket(url) {
  //   return this.getSecretData({
  //     url: "https://derucci.net/api/public/v1/getTicket",
  //     data: {
  //       url,
  //       timestamp: timestamp,
  //       secretKey: '477a1d7cc03d21d5abce55ec12170d33',
  //     }
  //   })
  // }

  testPhone(securityCode, phone, username) {
    return this.getSecretData({
      url: "api/antifake/v1/saveAntiFakeVerify",
      data: {
        securityCode,
        phone,
        username
      }
    })
  }
}
export { IndexModel }