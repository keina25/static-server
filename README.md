## 静态服务器 static server

* 定义：将nodejs test升级后，自动查找对应文件，即静态文件服务器

#### 缓存

* 添加Cache-Control 缓存（默认读取当前目录下的http_config.json）
* 好处：
  1. 第一次正常下载，需要10~100ms
  2. 第二次访问，直接从浏览器缓存读取，速度超快0ms；等缓存时间过了采去发起请求
* 如何放弃缓存
  1.修改url
  2.比如把 1.css改成1.css?t:20201111

## static server 制作完成