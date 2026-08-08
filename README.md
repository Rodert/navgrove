# navgrove

NavGrove 是一个面向全球用户的 AI、在线工具、开发者资源与优质网站发现平台。它以搜索和编辑精选为核心，帮助用户快速找到值得使用的互联网产品。

项目采用 Next.js 静态导出并部署到 Cloudflare Pages，支持多语言、RTL 布局、站内搜索以及 Google、Baidu 外部搜索。工具数据保持静态、可审核，并为未来的商业化展示和内容扩展预留了字段。

官方电子邮件：support@navgrove.com

## Development

```bash
pnpm install
pnpm dev
```

NavGrove is a static-first Next.js site. `pnpm build` generates the Cloudflare Pages artifact in `out/`.
