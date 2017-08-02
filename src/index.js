// 加载模块
const React = require('react')
const ReactDOM = require('react-dom')

import './index.less'
import errorFunction from './errorfun.js'
// errorFunction()

//初始化dom元素
document.body.innerHTML = '<div id="root"></div><div id="root2"></div>'



let formatName = user => {
    return `${user.firstName} ${user.lastName}`
}

let user0 = {
    firstName: 'Jim',
    lastName: 'Zeng'
}
let color0 = 'purple'

let elementName = (
    //这里用于放表达式的还是一对花括号，不过中间放的是对象值的时候 就看起来是两个了，样式的值要一个对象。。。
    <h1 style={{ borderColor: color0, borderWidth: '3px' }}>
        hello,{formatName(user0)},{2 + 2},{new Date().getTime()}
    </h1>
)

let elementNameObject = React.createElement(
    'h1', {
        className: 'test',
        style: { borderColor: color0, borderWidth: '3px' }
    }, [`hello,${formatName(user0)},${2 + 3},${new Date().getTime()}`]
)

//react渲染根元素
ReactDOM.render(
    elementName,
    document.querySelector('#root')
)

ReactDOM.render(
    elementNameObject,
    document.querySelector('#root2')
)