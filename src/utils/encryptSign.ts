import CryptoJS from "crypto-js"
type EncryptSignParams = {
  key: string
  iv: string
  content
}
// MD5
const md5 = (data: string) => CryptoJS.MD5(data).toString()
// 根据后台的签名生成逻辑生成签名
export const encryptSign = ({ key, iv, content }: EncryptSignParams) =>
  md5(getAesString(key, iv, content))
// aes加密
export const getAesString = (key: string, iv: string, data: string) => {
  key = CryptoJS.enc.Utf8.parse(key)
  iv = CryptoJS.enc.Utf8.parse(iv)
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  return encrypted.ciphertext.toString()
}
