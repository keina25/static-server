var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

//  if(path === '/'){
//    response.statusCode = 200
//    response.setHeader('Content-Type', 'text/html;charset=utf-8')
//    response.write(fs.readFileSync('./public/index.html'))
 //   response.end()
//  } else if(path === '/style.css'){
 //   response.statusCode = 200
//    response.setHeader('Content-Type', 'text/css;charset=utf-8')
//    response.write(fs.readFileSync('./public/style.css'))
//    response.end()
//  } else {
//    response.statusCode = 404
//    response.setHeader('Content-Type', 'text/html;charset=utf-8')
 //   response.write(`你输入的路径不存在对应的内容`)
 //   response.end()
//  }

response.statusCode = 200

//默认首页
const filePath = path === '/' ? '/index.html' :path //如果path是/，默认文件等于index.html,否则还是等于path(路径)

const index = filePath.lastIndexOf('.')
const suffix = filePath.substring(index) //suffix是后缀
const fileTypes = {  //用哈希表
    '.html':'text/html',
    '.css':'text/css',
    '.js':'text/javascript',
    '.png':'image/png',
    '.jpg':'image/jpeg'
}
response.setHeader('Content-Type', 
`${fileTypes[suffix] || 'text/html'};charset=utf-8`)  
//||如果出现上述条件不存在的，需要一个兜底值，html
//console.log(suffix)
//console.log(filePath.lastIndexOf('.'))  //获取文件点所在的第几位

let content
try{   //我这里面的代码有可能会报错
content =fs.readFileSync(`./public${filePath}`)

}catch(error){  //如果有错误，就抓住错误
    content = '文件不存在'
    response.statusCode = 404
}

//response.write(fs.readFileSync(`./public${x}`))
response.write(content)
response.end()

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)

