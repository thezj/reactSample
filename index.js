const React = require('react')
const ReactDOM = require('react-dom')

document.body.innerHTML = '<div id="root"></div>'

ReactDOM.render(
    <h1>hello,world</h1>,
    document.querySelector('#root')
)