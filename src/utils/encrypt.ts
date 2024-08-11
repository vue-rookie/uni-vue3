import JSEncrypt from "jsencrypt"
// 公钥，用于一些需要加密的数据
const publicKey = "xxx"

// 创建JSEncrypt对象
const encrypt = new JSEncrypt()

// 设置公钥
encrypt.setPublicKey(publicKey)

// 加密
export const encryptedPassword = (password: string) => {
  return encrypt.encrypt(password) + ""
}
