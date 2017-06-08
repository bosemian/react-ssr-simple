import express from 'express'
import httpProxy from 'http-proxy'
import { renderToString } from 'react-dom/server'
import ssr from './ssr'

const PORT = 3000
const app = express()
const targetUrl = `http://127.0.0.1:5000`

const proxy = httpProxy.createProxyServer({
  target: targetUrl
})

// ถ้า path ที่เข้ามาขึ้นต้นด้วย /api ให้เรียกไปที่ http://127.0.0.1:5000/api
app.use('/api', (req, res) => {
  proxy.web(req, res, { target: `${targetUrl}/api`});
})

app.use(ssr)

app.listen(PORT, error => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> Listening on port ${PORT}.`)
  }
})
