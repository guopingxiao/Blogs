# 什么是Electron？

Electron 技术方案进行桌面端的开发，跨平台兼容 macOS、Windows、Linux 等操作系统。可以让你写使用 JavaScript，HTML 和 CSS 构建跨平台的桌面应用程序。

![](http://i.imgur.com/Q5NgHkh.jpg)

# 快速入门

Electron 可以让你使用纯 JavaScript 调用丰富的原生 APIs 来创造桌面应用。你可以把它看作一个专注于桌面应用的 Node.js 的变体，而不是 Web 服务器。

这不意味着 Electron 是绑定了 GUI 库的 JavaScript。相反，Electron 使用 web 页面作为它的 GUI，所以你能把它看作成一个被 JavaScript 控制的，精简版的 Chromium 浏览器。

先来一个快速入门的案例（需要安装nodeJs和git）：
```bash
# 克隆这仓库
$ git clone https://github.com/electron/electron-quick-start electrondemo --depth 1
# 进入仓库
$ cd electron-quick-start
# 安装依赖库并运行应用
$ npm install && npm start
```

大体上，一个 Electron 应用的目录结构如下：
````
your-app/
├── package.json
├── main.js
└── index.html
````
`package.json `的格式和 Node 的完全一致，并且那个被 `main` 字段声明的脚本文件是你的应用的启动脚本，它运行在主进程上。你应用里的 `package.json` 看起来应该像：

	```json
	{
	  "name"    : "your-app",
	  "version" : "0.1.0",
	  "main"    : "main.js"
	}
	```

**注意**：如果 `main` 字段没有在 `package.json` 声明，Electron会优先加载 `index.js`。

`main.js` 应该用于创建窗口和处理系统事件，一个典型的例子如下：
	```javascript
	const electron = require('electron');
	// 控制应用生命周期的模块。
	const {app} = electron;
	// 创建原生浏览器窗口的模块。
	const {BrowserWindow} = electron;
	
	// 保持一个对于 window 对象的全局引用，如果你不这样做，
	// 当 JavaScript 对象被垃圾回收， window 会被自动地关闭
	let mainWindow;
	
	function createWindow() {
	  // 创建浏览器窗口。
	  mainWindow = new BrowserWindow({width: 800, height: 600});
	
	  // 加载应用的 index.html。
	  mainWindow.loadURL(`file://${__dirname}/index.html`);
	
	  // 启用开发工具。
	  mainWindow.webContents.openDevTools();
	
	  // 当 window 被关闭，这个事件会被触发。
	  mainWindow.on('closed', () => {
	    // 取消引用 window 对象，如果你的应用支持多窗口的话，
	    // 通常会把多个 window 对象存放在一个数组里面，
	    // 与此同时，你应该删除相应的元素。
	    mainWindow = null;
	  });
	}
	
	// Electron 会在初始化后并准备
	// 创建浏览器窗口时，调用这个函数。
	// 部分 API 在 ready 事件触发后才能使用。
	app.on('ready', createWindow);
	
	// 当全部窗口关闭时退出。
	app.on('window-all-closed', () => {
	  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
	  // 否则绝大部分应用及其菜单栏会保持激活。
	  if (process.platform !== 'darwin') {
	    app.quit();
	  }
	});
	
	app.on('activate', () => {
	  // 在 macOS 上，当点击 dock 图标并且该应用没有打开的窗口时，
	  // 绝大部分应用会重新创建一个窗口。
	  if (mainWindow === null) {
	    createWindow();
	  }
	});
	
	// 在这文件，你可以续写应用剩下主进程代码。
	// 也可以拆分成几个文件，然后用 require 导入。
	```

最后，展示的 `index.html` ：
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```

# 运行你的应用
一旦你创建了最初的 `main.js`， `index.html` 和 `package.json` 这几个文件，你可能会想尝试在本地运行并测试，看看是不是和期望的那样正常运行。

![](http://i.imgur.com/It7yNw9.jpg)


## 主进程
在 Electron 里，运行 `package.json` 里 `main` 脚本的进程被称为**主进程**。在主进程运行的脚本可以以创建 web 页面的形式展示 GUI。

## 渲染进程
由于 Electron 使用 Chromium 来展示页面，所以 Chromium 的多进程结构也被充分利用。每个 Electron 的页面都在运行着自己的进程，这样的进程我们称之为**渲染进程**。

在一般浏览器中，网页通常会在沙盒环境下运行，并且不允许访问原生资源。然而，Electron 用户拥有在网页中调用 Node.js 的 APIs 的能力，可以与底层操作系统直接交互。

![](http://i.imgur.com/gT50O43.png)

## 主进程与渲染进程的区别
主进程使用 `BrowserWindow` 实例创建页面。每个 `BrowserWindow` 实例都在自己的渲染进程里运行页面。当一个 `BrowserWindow` 实例被销毁后，相应的渲染进程也会被终止。

主进程管理所有页面和与之对应的渲染进程。每个渲染进程都是相互独立的，并且只关心他们自己的页面。

由于在页面里管理原生 GUI 资源是非常危险而且容易造成资源泄露，所以在页面调用 GUI 相关的 APIs 是不被允许的。如果你想在网页里使用 GUI 操作，其对应的渲染进程必须与主进程进行通讯，请求主进程进行相关的 GUI 操作。
![](http://i.imgur.com/ZF5kUzG.png)

在 Electron，我们提供几种方法用于主进程和渲染进程之间的通讯。像 [ipcRenderer] 和 [ipcMain] 模块用于发送消息， [remote] 模块用于 RPC 方式通讯。
## electron-prebuilt
[electron-prebuilt] 是一个 `npm` 模块，包含所使用的 Electron 预编译版本。 
如果你已经用 `npm` 全局安装了它，你只需要按照如下方式直接运行你的应用：
```bash
electron .
```
如果你是局部安装，那运行：
```bash
./node_modules/.bin/electron .
```

## 手工下载 Electron 二进制文件
如果你手工下载了 Electron 的二进制文件，你也可以直接使用其中的二进制文件直接运行你的应用。
### Windows
```bash
$ .\electron\electron.exe your-app\
```
### Linux
```bash
$ ./electron/electron your-app/
```
### macOS
```bash
$ ./Electron.app/Contents/MacOS/Electron your-app/
```
`Electron.app` 里面是 Electron 发布包





# 打造你第一个全端的桌面音乐播放器

新建一个my-music 的工程，npm init 初始化该项目，进入项目，查看package.json文件；

将my-music 下面的除了package.json文件拷贝到新建的目录下面；

安装依赖electron; 可以使用npm.taobao.com 淘宝镜像；


```
{
  "name": "my-music",
  "version": "1.0.0",
  "description": "my-music use electron and vue",
  "main": "main.js",
  "scripts": {
    "test": "electron ."
  },
  "keywords": [
    "my-music",
    "vue",
    "electron"
  ],
  "author": "gpxiao",
  "license": "ISC",
  "devDependencies": {
    "electron-prebuilt": "^1.3.3"
  }
}
```

安装依赖；

```
npm install electron-prebuilt --save-dev
```


安装完之后可以看到`my-music\node_modules\.bin\electron.cmd` 命令脚本；
我们可以配置`package.json`下面的test命令字：  来启动当前目录的index.html文件；
可以在当前目录下直接通过elctron运行该项目

```
"./node_modules/.bin/electron" ./main.js
```

这样比较麻烦，可以在package.json中配置字段"test"

	

```
"test': "electron ."
```

那这样可以直接在命令行中 `npm run test` 即可运行了。

可以看到入口文件就是main.js，载入当前目录的index.html文件（Vue构建的一个音乐播放器代码），这里不细说,主要是通过Vue.js和vue-router，vue-resource开发的一个音乐播放器；

	```
	<body class="page">
	  <header class="header">
	    <a v-link="{ name: 'home' }"><i class="fa fa-expand"></i></a>
	    <h1><i class="fa fa-music"></i> Music Player</h1>
	    <a v-link="{ name: 'list' }"><i class="fa fa-list"></i></a>
	  </header>
	  <section class="main">
	    <router-view></router-view>
	  </section>
	  <script id="home_tmpl" type="text/v-template">
	    <img src="assets/img/home.png" alt="" width="100%">
	  </script>
	  <script id="list_tmpl" type="text/v-template">
	    <div class="list">
	      <ol>
	        <li v-for="item in list">
	          <a v-link="{ name: 'item', params: { id: item.id } }">
	            <span class="num">{{pad(item.id, 3)}}</span>
	            <div class="info">
	              <h3 class="title">{{item.name}}</h3>
	              <span class="artist">{{item.artist}}</span>
	            </div>
	            <span class="duration">{{item.duration}}</span>
	            <div class="photo"><img :src="item.poster"></div>
	          </a>
	        </li>
	      </ol>
	    </div>
	  </script>
	  <script id="item_tmpl" type="text/v-template">
	    <div class="player">
	      <div class="disc">
	        <img :src="item.poster" alt="{{item.name}}" :style="{transform:'rotate(' + (item.current/item.duration*360*2) + 'deg)'}">
	        <span class="duration">{{convert(item.duration-item.current)}}</span>
	      </div>
	      <h2 class="title">{{item.name}}</h2>
	      <h3 class="artist">{{item.artist}}</h3>
	      <div class="lyric">
	        <p class="previous">人如天上的明月是不可拥有</p>
	        <p class="current">情如曲过只遗留无可挽救再分别</p>
	        <p class="next">为何只是失望填密我的空虚</p>
	      </div>
	      <input type="range" value="0" min="0" max="{{item.duration}}" v-model="item.current" @change="progress()">
	      <div class="controls">
	        <button><i class="fa fa-retweet"></i></button>
	        <button class="active" @click="prev()"><i class="fa fa-backward"></i></button>
	        <button class="active" @click="play()"><i class="fa" :class="{'fa-play':!item.playing, 'fa-pause':item.playing}"></i></button>
	        <button class="active" @click="next()"><i class="fa fa-forward"></i></button>
	        <button class="active"><i class="fa fa-random"></i></button>
	      </div>
	    </div>
	  </script>
	  <script src="libs/vue/vue.js"></script>
	  <script src="libs/vue-router/vue-router.js"></script>
	  <script src="libs/vue-resource/vue-resource.js"></script>
	  <script src="app.js"></script>
	</body>
	```

先看在浏览器中的效果

![](http://i.imgur.com/2b2XYxo.jpg)

这样项目可以在electron运行起来的原因是： 在app.js中使用的都是jsonp的方式来获取服务端的数据，这样的话，就不存在跨域的问题了，只要服务器这边运行起来了，就可以通过jsonp的方式获得相应的数据；

如何讲我们的应用部署为一个桌面应用，双击就能打开？

# 应用部署

为了使用 Electron 部署你的应用程序，你存放应用程序的文件夹需要叫做 `app` 并且需要放在 Electron 的
资源文件夹下（在 macOS 中是指 `Electron.app/Contents/Resources/`，在 Linux 和 Windows 中是指 `resources/`）
就像这样：

在 macOS 中:

	```text
	electron/Electron.app/Contents/Resources/app/
	├── package.json
	├── main.js
	└── index.html
	```

在 Windows 和 Linux 中:

	```text
	electron/resources/app
	├── package.json
	├── main.js
	└── index.html
	```

然后运行 `Electron.app` （或者 Linux 中的 `electron`，Windows 中的 `electron.exe`）,
接着 Electron 就会以你的应用程序的方式启动。`electron` 文件夹将被部署并可以分发给最终的使用者。

## 将你的应用程序打包成一个文件

除了通过拷贝所有的资源文件来分发你的应用程序之外，你可以通过打包你的应用程序为一个 [asar](https://github.com/atom/asar) 库文件以避免暴露你的源代码。

为了使用一个 `asar` 库文件代替 `app` 文件夹，你需要修改这个库文件的名字为 `app.asar` ，
然后将其放到 Electron 的资源文件夹下，然后 Electron 就会试图读取这个库文件并从中启动。
如下所示：

在 macOS 中:

	```text
	electron/Electron.app/Contents/Resources/
	└── app.asar
	```

在 Windows 和 Linux 中:

	```text
	electron/resources/
	└── app.asar
	```

这样的我们的音乐播放器就顺利生成了。可以看到生成了相应的exe安装文件

![](http://i.imgur.com/Qm5hAuC.jpg)

可以用自己的音乐播放器听歌了

![](http://i.imgur.com/ocKUNu3.gif)


