const mockList = require("./api/mockList")
const express = require("express")
const fs = require("fs")
const path = require("path")
const app = express()
const cors = require("cors")
const PORT = 5000
console.log(mockList)
// 配置 CORS 中间件
app.use(
  cors({
    origin: "http://localhost:9000", // 允许的来源
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
mockList.forEach((item) => {
  app.post(item.url, (req, res) => {
    const fileName = item.url.replace("/api/", "")
    const filePath = path.join(__dirname, `/api/${fileName}.json`)
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).send("Error reading file")
      }
      res.setHeader("Content-Type", "application/json")
      res.setHeader("Access-Control-Allow-Origin", "*")
      // 返回json格式的数据
      res.send(data)
    })
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
