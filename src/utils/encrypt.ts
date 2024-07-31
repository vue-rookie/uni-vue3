import JSEncrypt from "jsencrypt"

const publicKey =
  "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDWlIo96AfFfZruj1joeUXTXvoiCFhDtZ+lLQqsuPO+pk1xD9k/jrfeCh25ywUkzjjT6hiLqiPyD9NbJuJernkjbtu7dRd7PmVLvFOR3yFlS0klsPaohe29r0MQL3bPFfTp64Y52lOMNIT/j19xSoWWDseMKAGuyqyG/EHgIDeKBQIDAQAB"

// 创建JSEncrypt对象
const encrypt = new JSEncrypt()

// 设置公钥
encrypt.setPublicKey(publicKey)

// 加密
export const encryptedPassword = (password: string) => {
  return encrypt.encrypt(password) + ""
}
