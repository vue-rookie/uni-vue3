const pageConfig = require("../src/config/style.config.json")
const { body = {} } = pageConfig.layoutEnum?.indexPage || {}
const express = require("express")
const fs = require("fs")
const path = require("path")
const app = express()
const cors = require("cors")
const PORT = 5000

// 配置 CORS 中间件
app.use(
  cors({
    origin: "http://localhost:9001", // 允许的来源
    methods: "GET,POST,PUT,DELETE", // 允许的 HTTP 方法
    allowedHeaders: "Content-Type,Authorization", // 允许的请求头
  }),
)
const getApiPaths = () => {
  return body.bodyList?.map((item) => item.api)
}

app.get("/", (req, res) => {
  res.json("你好!! uni-vue3")
})
getApiPaths().forEach((url) => {
  console.log(url)

  app.post(url, (req, res) => {
    // 把/api/getCards/转化为api/getCards.json
    const fileName = url.replace("/api/", "")
    const filePath = path.join(__dirname, `/api/${fileName}.json`)
    console.log(filePath)

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).send("Error reading file")
      }
      res.setHeader("Content-Type", "application/json")
      // 返回json格式的数据
      res.send(data)
    })
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
