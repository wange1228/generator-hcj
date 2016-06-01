# HCJ 前端开发工作流

你还在为跑不起来的开发环境发愁吗？  
你还在为蛋疼的调试过程捉急吗？  
你还在为代码冲突而忧伤吗？  
开发调试，打包提测的必备良药 —— **HCJ Engine** 上市了！

---

## 开发背景

1. 前端没有独立的开发环境，完全依赖后端的环境运行，经常发生环境起不起来的问题而影响前端开发效率
2. 开发环境的配置过于复杂，对于新人来说门槛太高，耗费时间太长
3. 前端的调试过程非常麻烦，每次都要通过 fis3 打包后才能看到代码运行结果
4. 基于第 3 点，造成过多 fis3 打包生成的 hash 后的冗余文件
5. fis3 打包涉及范围太广，会把项目之外的其他静态文件一起压缩，难免会有误伤

---

## 设计原则

1. 基于原来的目录结构进行开发，确保代码结构不影响发布
2. 尽量保持前端同学原有的开发习惯，比如使用 LESS，文件名 hash 化，代码压缩等等，确保无缝迁移
3. 不影响后端开发环境，后端开发同学无感知
4. 原有的开发环境仍然可用
5. 解决提交代码后经常发生冲突的问题
6. 为前后端分离打下基础

---

## 功能特性

1. 支持 HttpSever 功能，本地秒启服务
2. 支持 LiveReload，保存文件后自动刷新浏览器，不用按 F5 刷新
3. 支持 SourceMap，压缩的代码一样可以断点调试
4. 支持 HTML / CSS / JavaScript 的压缩
5. 支持 include 的方式引入 HTML 文件
6. 支持 LESS 语法的 CSS 预编译
7. 支持打包自动添加并修改 hash 文件名

---

## 使用方法

* 安装 [Node.js](https://nodejs.org/)
* 安装 [Grunt](http://www.gruntjs.com/)
* 从 [HCJ_Engine](http://gitlab.tools.vipshop.com/wange.zhu/hcj_engine/tree/master) 项目的仓库中获取最新代码，并放置于 financing 根目录下
* 执行 `npm install`
* 配置 config.json，如下：

```json
{
    "project": {
        "src": {
            "pages": "financing-frontend-mobile-develop",
            "static": "financing-frontend-mobile-develop",
            "path": "activity/20160514"
        },
        "build": {
            "pages": "financing-mobile/financing-mobile-webapp/src/main/webapp",
            "static": "financing-frontend-mobile-static",
            "path": "activity/20160514"
        }
    }
}
```

* 开发模式

```shell
grunt dev
```

* 打包模式

```shell
grunt build
```

---

## 目录结构

```plain
├── financing-frontend-mobile-develop
│   ├── images
│   ├── pages
│   ├── scripts
│   └── styles
├── financing-frontend-mobile-static
│   └── mobile
│       ├── images
│       ├── scripts
│       └── styles
├── financing-mobile
│   └── financing-mobile-webapp
│       └── src
├── Gruntfile.js
├── package.json
└── project.json
```

---

## 未完待续

* 目前仅支持移动端的开发环境（因为移动端环境比较恶劣，优先解决）
* 前端 Git 仓库尚未和后端分离

---

## 更新日志

| Date          | Version       | Log           |
| ------------- | ------------- | ------------- |
| 2016.05.15    | v0.2.0        | 增加 grunt-includes 模块，实现 html 模块化开发 |
| 2016.05.14    | v0.1.0        | 初始版本，解决前端环境独立问题 |
