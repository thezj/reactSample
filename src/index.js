// 加载模块
const React = require('react')
const ReactDOM = require('react-dom')

import './index.less'
import errorFunction from './errorfun.js'
// errorFunction()

//初始化dom元素
document.body.innerHTML = '<div id="root"></div>'

//react渲染根元素
ReactDOM.render(
    <h1> hello, world </h1>,
    document.querySelector('#root')
)